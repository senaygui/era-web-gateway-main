import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  budget: number;
  start_date: string;
  end_date: string;
  contractor: string;
  project_manager: string;
  objectives: string;
  scope: string;
  milestones: any[];
  challenges: any[];
  images: {
    id: string;
    url: string;
    thumbnail_url: string;
  }[];
  documents?: {
    id: string;
    filename: string;
    content_type: string;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
  // Additional properties needed for frontend display
  image_url?: string;
  project_type?: string;
  progress?: number;
  funding_source?: string;
  metadata?: {
    gallery?: string[];
    documents?: {
      name: string;
      url: string;
      type: string;
    }[];
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1' || 'http://172.16.10.27/api/v1' || 'http://172.16.10.27/api/v1',
});

// Helper to calculate progress based on milestones
const calculateProgress = (project: Project): number => {
  if (!project.milestones) return 0;
  
  // Handle string JSON
  let milestones = project.milestones;
  if (typeof milestones === 'string') {
    try {
      milestones = JSON.parse(milestones);
    } catch (e) {
      console.error('Error parsing milestones JSON:', e);
      return 0;
    }
  }
  
  if (!Array.isArray(milestones) || milestones.length === 0) return 0;
  
  // Count completed milestones
  const completedMilestones = milestones.filter(m => {
    return m && (m.completed === true || m.status === 'completed');
  }).length;
  
  return Math.round((completedMilestones / milestones.length) * 100);
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching projects from:', `${api.defaults.baseURL}/projects`);
      const response = await api.get('/projects');
      console.log('Projects API Response:', response.data);
      
      // Handle different response structures
      let projectsData = response.data;
      
      // If the response is an object with a projects property
      if (response.data && !Array.isArray(response.data) && response.data.projects) {
        projectsData = response.data.projects;
      }
      
      // Ensure we have an array
      if (!Array.isArray(projectsData)) {
        console.error('Invalid response structure:', response.data);
        projectsData = [];
      }
      
      // Transform the data to match our frontend model
      const transformedProjects = projectsData.map((project: any) => {
        // Ensure we have a valid project object
        if (!project || typeof project !== 'object') return null;
        
        // Extract images data
        const images = Array.isArray(project.images) ? project.images : [];
        const imageUrl = images.length > 0 && images[0].url ? images[0].url : '/placeholder-project.jpg';
        
        // Extract project type from scope
        let projectType = 'Infrastructure';
        if (project.scope) {
          if (typeof project.scope === 'string') {
            projectType = project.scope.split('\n')[0]?.trim() || 'Infrastructure';
          } else if (project.scope.type) {
            projectType = project.scope.type;
          }
        }
        
        return {
          ...project,
          progress: calculateProgress(project),
          project_type: projectType,
          image_url: imageUrl,
        };
      }).filter(Boolean); // Remove any null values
      
      setProjects(transformedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        setError(err.response?.data?.error || 'Failed to fetch projects');
      } else {
        setError('Failed to fetch projects');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      console.log('Fetching project details from:', `${api.defaults.baseURL}/projects/${id}`);
      const response = await api.get(`/projects/${id}`);
      console.log('Project API Response:', response.data);
      
      if (!response.data) {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response structure from API');
      }
      
      // Transform the data to match our frontend model
      const transformedProject = {
        ...response.data,
        progress: calculateProgress(response.data),
        project_type: response.data.scope?.split('\n')[0]?.trim() || 'Infrastructure',
        image_url: response.data.images && response.data.images.length > 0 ? response.data.images[0].url : '/placeholder-project.jpg',
        metadata: {
          gallery: response.data.images?.map((img: any) => img.url) || [],
          documents: response.data.documents?.map((doc: any) => ({
            name: doc.filename,
            url: doc.url,
            type: doc.content_type
          })) || []
        }
      };
      
      setProject(transformedProject);
      setError(null);
    } catch (err) {
      console.error('Error fetching project:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        setError(err.response?.data?.message || 'Failed to fetch project details');
      } else {
        setError('Failed to fetch project details');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  return { project, loading, error, refetch: fetchProject };
};

export const useCompletedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletedProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching completed projects from:', `${api.defaults.baseURL}/projects/completed`);
      const response = await api.get('/projects/completed');
      console.log('Completed Projects API Response:', response.data);
      
      // Handle different response structures
      let projectsData = response.data;
      
      // If the response is an object with a projects property
      if (response.data && !Array.isArray(response.data) && response.data.projects) {
        projectsData = response.data.projects;
      }
      
      // Ensure we have an array
      if (!Array.isArray(projectsData)) {
        console.error('Invalid response structure:', response.data);
        projectsData = [];
      }
      
      // Transform the data to match our frontend model
      const transformedProjects = projectsData.map((project: any) => {
        // Ensure we have a valid project object
        if (!project || typeof project !== 'object') return null;
        
        // Extract images data
        const images = Array.isArray(project.images) ? project.images : [];
        const imageUrl = images.length > 0 && images[0].url ? images[0].url : '/placeholder-project.jpg';
        
        return {
          ...project,
          progress: 100, // Completed projects are at 100%
          project_type: project.scope?.split('\n')[0]?.trim() || 'Infrastructure',
          image_url: imageUrl,
        };
      }).filter(Boolean); // Remove any null values
      
      setProjects(transformedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching completed projects:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        setError(err.response?.data?.error || 'Failed to fetch completed projects');
      } else {
        setError('Failed to fetch completed projects');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  return { projects, loading, error, refetch: fetchCompletedProjects };
};

export const useOngoingProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOngoingProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching ongoing projects from:', `${api.defaults.baseURL}/projects/ongoing`);
      const response = await api.get('/projects/ongoing');
      console.log('Ongoing Projects API Response:', response.data);
      
      // Handle different response structures
      let projectsData = response.data;
      
      // If the response is an object with a projects property
      if (response.data && !Array.isArray(response.data) && response.data.projects) {
        projectsData = response.data.projects;
      }
      
      // Ensure we have an array
      if (!Array.isArray(projectsData)) {
        console.error('Invalid response structure:', response.data);
        projectsData = [];
      }
      
      // Transform the data to match our frontend model
      const transformedProjects = projectsData.map((project: any) => {
        // Ensure we have a valid project object
        if (!project || typeof project !== 'object') return null;
        
        // Extract images data
        const images = Array.isArray(project.images) ? project.images : [];
        const imageUrl = images.length > 0 && images[0].url ? images[0].url : '/placeholder-project.jpg';
        
        return {
          ...project,
          progress: calculateProgress(project),
          project_type: project.scope?.split('\n')[0]?.trim() || 'Infrastructure',
          image_url: imageUrl,
        };
      }).filter(Boolean); // Remove any null values
      
      setProjects(transformedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching ongoing projects:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        setError(err.response?.data?.error || 'Failed to fetch ongoing projects');
      } else {
        setError('Failed to fetch ongoing projects');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingProjects();
  }, []);

  return { projects, loading, error, refetch: fetchOngoingProjects };
}; 