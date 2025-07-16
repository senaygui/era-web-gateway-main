import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects, useOngoingProjects, useCompletedProjects } from '@/hooks/useProjects';
import { Project } from '@/hooks/useProjects';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

const ProjectCard = ({ project }: { project: Project }) => {
  // Safely handle missing image
  let imageUrl = '/placeholder-project.jpg';
  
  if (project.image_url) {
    imageUrl = project.image_url;
  } else if (project.images && Array.isArray(project.images) && project.images.length > 0) {
    const firstImage = project.images[0];
    if (firstImage && typeof firstImage === 'object' && firstImage.url) {
      imageUrl = firstImage.url;
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="space-y-3">
          {project.location && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Location:</span>
              <span>{project.location}</span>
            </div>
          )}
          {project.project_type && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Type:</span>
              <span>{project.project_type}</span>
            </div>
          )}
          {project.status === 'ongoing' && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress:</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}
          {project.start_date && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Start Date:</span>
              <span>{format(new Date(project.start_date), 'MMM yyyy')}</span>
            </div>
          )}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="mt-4 inline-block w-full text-center bg-era-orange text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const { projects: allProjects, loading: allLoading, error: allError } = useProjects();
  const { projects: ongoingProjects, loading: ongoingLoading, error: ongoingError } = useOngoingProjects();
  const { projects: completedProjects, loading: completedLoading, error: completedError } = useCompletedProjects();

  const loading = activeTab === 'all' ? allLoading : activeTab === 'ongoing' ? ongoingLoading : completedLoading;
  const error = activeTab === 'all' ? allError : activeTab === 'ongoing' ? ongoingError : completedError;

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-era-orange"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-red-600">
          <p>Error loading projects. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our ongoing and completed infrastructure projects across Ethiopia.
          From road construction to bridge development, we're committed to building
          a better transportation network for our nation.
        </p>
      </motion.div>

      <Tabs defaultValue="ongoing" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {allProjects.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              No projects to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ongoing">
          {ongoingProjects.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              No ongoing projects at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ongoingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedProjects.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              No completed projects to display.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects; 