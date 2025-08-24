import React, { useState } from 'react';
import { Plus, Edit, Trash2, Mail, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoutine, Teacher } from '@/contexts/RoutineContext';
import { TeacherForm } from './TeacherForm';

export function TeacherManagement() {
  const { state, dispatch } = useRoutine();
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setShowForm(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowForm(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    dispatch({ type: 'DELETE_TEACHER', payload: teacherId });
  };

  const handleFormSubmit = (teacherData: Omit<Teacher, 'id'>) => {
    if (editingTeacher) {
      dispatch({
        type: 'UPDATE_TEACHER',
        payload: { ...teacherData, id: editingTeacher.id }
      });
    } else {
      dispatch({
        type: 'ADD_TEACHER',
        payload: { ...teacherData, id: Date.now().toString() }
      });
    }
    setShowForm(false);
    setEditingTeacher(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTeacher(null);
  };

  if (showForm) {
    return (
      <TeacherForm
        teacher={editingTeacher}
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
          <h1 className="text-2xl font-bold text-foreground">Teacher Management</h1>
          <p className="text-muted-foreground">Manage faculty members and their availability</p>
        </div>
        <Button onClick={handleAddTeacher} className="bg-gradient-primary shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">{state.teachers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Today</p>
                <p className="text-2xl font-bold">
                  {state.teachers.filter(t => 
                    t.availableDays.includes(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <Mail className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Time</p>
                <p className="text-2xl font-bold">
                  {state.teachers.filter(t => t.availableDays.length >= 5).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {state.teachers.map((teacher) => (
          <Card key={teacher.id} className="hover:shadow-medium transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{teacher.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Mail className="w-3 h-3 mr-1" />
                    {teacher.email}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditTeacher(teacher)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Available Days */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Available Days
                </p>
                <div className="flex flex-wrap gap-1">
                  {teacher.availableDays.map((day) => (
                    <Badge key={day} variant="secondary" className="text-xs">
                      {day.substring(0, 3)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Available Time Slots */}
              <div>
                <p className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Available Time Slots
                </p>
                <div className="flex flex-wrap gap-1">
                  {teacher.availableTimeSlots.map((timeSlotId) => {
                    const timeSlot = state.timeSlots.find(ts => ts.id === timeSlotId);
                    return timeSlot ? (
                      <Badge key={timeSlotId} variant="outline" className="text-xs">
                        {timeSlot.startTime}-{timeSlot.endTime}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {state.teachers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Teachers Found</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first teacher to the system.
            </p>
            <Button onClick={handleAddTeacher} className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add First Teacher
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}