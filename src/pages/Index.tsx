import React, { useState } from 'react';
import { RoutineProvider } from '@/contexts/RoutineContext';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { TeacherManagement } from '@/components/TeacherManagement';
import { FacultyManagement } from '@/components/FacultyManagement';
import { SubjectManagement } from '@/components/SubjectManagement';
import { RoutineGenerator } from '@/components/RoutineGenerator';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'teachers':
        return <TeacherManagement />;
      case 'faculties':
        return <FacultyManagement />;
      case 'subjects':
        return <SubjectManagement />;
      case 'routine':
        return <RoutineGenerator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <RoutineProvider>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>
    </RoutineProvider>
  );
};

export default Index;
