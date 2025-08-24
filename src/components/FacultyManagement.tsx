import React, { useState } from 'react';
import { Plus, Edit, Trash2, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoutine, Faculty } from '@/contexts/RoutineContext';
import { FacultyForm } from './FacultyForm';

export function FacultyManagement() {
  const { state, dispatch } = useRoutine();
  const [showForm, setShowForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const handleAddFaculty = () => {
    setEditingFaculty(null);
    setShowForm(true);
  };

  const handleEditFaculty = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setShowForm(true);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    dispatch({ type: 'DELETE_FACULTY', payload: facultyId });
  };

  const handleFormSubmit = (facultyData: Omit<Faculty, 'id'>) => {
    if (editingFaculty) {
      dispatch({
        type: 'UPDATE_FACULTY',
        payload: { ...facultyData, id: editingFaculty.id }
      });
    } else {
      dispatch({
        type: 'ADD_FACULTY',
        payload: { ...facultyData, id: Date.now().toString() }
      });
    }
    setShowForm(false);
    setEditingFaculty(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingFaculty(null);
  };

  if (showForm) {
    return (
      <FacultyForm
        faculty={editingFaculty}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculties and their batches</p>
        </div>
        <Button onClick={handleAddFaculty} className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Faculties</p>
                <p className="text-2xl font-bold">{state.faculties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Batches</p>
                <p className="text-2xl font-bold">
                  {state.faculties.reduce((total, faculty) => total + faculty.batches.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Batches/Faculty</p>
                <p className="text-2xl font-bold">
                  {state.faculties.length > 0 
                    ? Math.round(state.faculties.reduce((total, faculty) => total + faculty.batches.length, 0) / state.faculties.length * 10) / 10
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculties List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {state.faculties.map((faculty) => (
          <Card key={faculty.id} className="hover:shadow-medium transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{faculty.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {faculty.batches.length} batches
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditFaculty(faculty)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteFaculty(faculty.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Batches */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Batches ({faculty.batches.length})
                </p>
                <div className="flex flex-wrap gap-1">
                  {faculty.batches.map((batch) => (
                    <Badge key={batch.id} variant="secondary" className="text-xs">
                      {batch.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Subjects count */}
              <div>
                <p className="text-sm font-medium mb-1 flex items-center">
                  Subjects: {state.subjects.filter(s => s.facultyId === faculty.id).length}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {state.faculties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Faculties Found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first faculty to organize your academic structure.
            </p>
            <Button onClick={handleAddFaculty} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add First Faculty
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}