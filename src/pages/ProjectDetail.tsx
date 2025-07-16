import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProject } from '@/hooks/useProjects';
import { Progress } from '@/components/ui/progress';
import { format, parseISO } from 'date-fns';
import { Download, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const ProjectDetail = () => {
  const { id } = useParams();
  const { project, loading, error } = useProject(id || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-era-orange"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container-custom py-12">
        <div className="text-center text-red-600">
          <p>Error loading project details. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Helper function to safely get image URL
  const getImageUrl = (project: any) => {
    if (project.image_url) {
      return project.image_url;
    } else if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      const firstImage = project.images[0];
      if (firstImage && typeof firstImage === 'object' && firstImage.url) {
        return firstImage.url;
      }
    }
    return '/placeholder-project.jpg';
  };
  
  // Get gallery images from either the metadata or directly from images array
  const gallery = project.metadata?.gallery || 
                 (project.images && Array.isArray(project.images) ? 
                  project.images.map((img: any) => {
                    return typeof img === 'string' ? img : (img && img.url ? img.url : null);
                  }).filter(Boolean) : 
                  []);
                 
  // Get documents from either metadata or directly from documents array
  const documents = project.metadata?.documents || 
                  (project.documents && Array.isArray(project.documents) ? 
                   project.documents.map((doc: any) => ({
                     name: doc.filename || doc.name || 'Document',
                     url: doc.url || '',
                     type: doc.content_type || doc.type || 'application/octet-stream'
                   })).filter((doc: any) => doc.url) : 
                   []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <Link to="/projects" className="flex items-center text-gray-600 hover:text-era-orange mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed' ? 'bg-green-100 text-green-800' :
              project.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            {project.location && <span>{project.location}</span>}
            {project.project_type && <span>{project.project_type}</span>}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={getImageUrl(project)}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Description */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Project Information</h3>
                <div className="space-y-3">
                  {project.contractor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contractor:</span>
                      <span>{project.contractor}</span>
                    </div>
                  )}
                  {project.project_manager && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Project Manager:</span>
                      <span>{project.project_manager}</span>
                    </div>
                  )}
                  {project.start_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span>{format(parseISO(project.start_date), 'MMM yyyy')}</span>
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span>{format(parseISO(project.end_date), 'MMM yyyy')}</span>
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget:</span>
                      <span>{new Intl.NumberFormat('en-ET', {
                        style: 'currency',
                        currency: 'ETB'
                      }).format(project.budget)}</span>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span>{project.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Section */}
              {project.status === 'ongoing' && project.progress !== undefined && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  {/* Milestones */}
                  {project.milestones && Array.isArray(project.milestones) && project.milestones.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-md font-medium mb-3">Milestones</h4>
                      <ul className="space-y-2">
                        {project.milestones.map((milestone: any, index) => {
                          const title = milestone.title || milestone.name || 'Milestone';
                          const completed = typeof milestone.completed === 'boolean' ? milestone.completed : false;
                          return (
                            <li key={index} className="flex items-start">
                              <div className={`w-4 h-4 mt-1 mr-3 rounded-full flex-shrink-0 ${completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                              <div>
                                <p className="font-medium">{title}</p>
                                {milestone.description && <p className="text-sm text-gray-600">{milestone.description}</p>}
                                {milestone.date && <p className="text-xs text-gray-500">{milestone.date}</p>}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Objectives Section */}
              {project.objectives && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Project Objectives</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{project.objectives}</p>
                  </div>
                </div>
              )}
              
              {/* Challenges Section */}
              {project.challenges && Array.isArray(project.challenges) && project.challenges.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Project Challenges</h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge: any, index) => {
                      const title = challenge.title || challenge.name || 'Challenge';
                      return (
                        <li key={index} className="text-gray-600">
                          <span className="font-medium">{title}</span>
                          {challenge.description && <p className="text-sm">{challenge.description}</p>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Project Gallery */}
            {gallery.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
                <div className="relative">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <img
                      src={gallery[currentImageIndex]}
                      alt={`Project gallery image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    {gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-era-orange' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Documents */}
          {documents.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Project Documents</h2>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 mr-3 overflow-hidden">
                        <span className="text-sm text-gray-600 block truncate">{doc.name}</span>
                        <span className="text-xs text-gray-400">{doc.type}</span>
                      </div>
                      <Download size={16} className="text-era-orange flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail; 