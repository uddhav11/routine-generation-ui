import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoutine, Subject } from '@/contexts/RoutineContext';
import { SubjectForm } from './SubjectForm';

export function SubjectManagement() {
  const { state, dispatch } = useRoutine();
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const handleAddSubject = () => {
    setEditingSubject(null);
    setShowForm(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setShowForm(true);
  };

  const handleDeleteSubject = (subjectId: string) => {
    dispatch({ type: 'DELETE_SUBJECT', payload: subjectId });
  };

  const handleFormSubmit = (subjectData: Omit<Subject, 'id'>) => {
    if (editingSubject) {
      dispatch({
        type: 'UPDATE_SUBJECT',
        payload: { ...subjectData, id: editingSubject.id }
      });
    } else {
      dispatch({
        type: 'ADD_SUBJECT',
        payload: { ...subjectData, id: Date.now().toString() }
      });
    }
    setShowForm(false);
    setEditingSubject(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSubject(null);
  };

  const getSubjectsByFaculty = () => {
    const subjectsByFaculty: Record<string, Subject[]> = {};
    state.subjects.forEach(subject => {
      if (!subjectsByFaculty[subject.facultyId]) {
        subjectsByFaculty[subject.facultyId] = [];
      }
      subjectsByFaculty[subject.facultyId].push(subject);
    });
    return subjectsByFaculty;
  };

  if (showForm) {
    return (
      <SubjectForm
        subject={editingSubject}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  const subjectsByFaculty = getSubjectsByFaculty();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subject Management</h1>
          <p className="text-muted-foreground">Manage courses and subjects for each faculty</p>
        </div>
        <Button onClick={handleAddSubject} className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Subjects</p>
                <p className="text-2xl font-bold">{state.subjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {state.faculties.map((faculty) => (
          <Card key={faculty.id}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{faculty.name}</p>
                  <p className="text-2xl font-bold">
                    {state.subjects.filter(s => s.facultyId === faculty.id).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subjects by Faculty */}
      {state.faculties.map((faculty) => {
        const facultySubjects = subjectsByFaculty[faculty.id] || [];
        
        return (
          <Card key={faculty.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>{faculty.name} Faculty</span>
                <Badge variant="secondary">{facultySubjects.length} subjects</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {facultySubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facultySubjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="p-4 border rounded-lg bg-muted/20 hover:shadow-soft transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{subject.name}</h4>
                          <p className="text-sm text-muted-foreground">{subject.code}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditSubject(subject)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {subject.credits} credits
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No subjects added for this faculty yet.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={handleAddSubject}
                  >
                    Add First Subject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {state.subjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Subjects Found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding subjects to your faculties to build your curriculum.
            </p>
            <Button onClick={handleAddSubject} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add First Subject
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}