import React, { useState } from 'react';
import { Calendar, Settings, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRoutine } from '@/contexts/RoutineContext';
import { TimetableGrid } from './TimetableGrid';
import { useToast } from '@/hooks/use-toast';

export function RoutineGenerator() {
  const { state, dispatch } = useRoutine();
  const { toast } = useToast();
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [showTimetable, setShowTimetable] = useState(false);

  const handleFacultyChange = (facultyId: string) => {
    setSelectedFaculty(facultyId);
    setSelectedBatch('');
    dispatch({ type: 'SET_SELECTED_FACULTY', payload: facultyId });
  };

  const handleBatchChange = (batchId: string) => {
    setSelectedBatch(batchId);
    dispatch({ type: 'SET_SELECTED_BATCH', payload: batchId });
  };

  const generateRoutine = () => {
    if (!selectedFaculty || !selectedBatch) {
      toast({
        title: "Selection Required",
        description: "Please select both faculty and batch to generate routine.",
        variant: "destructive"
      });
      return;
    }

    dispatch({
      type: 'GENERATE_ROUTINE',
      payload: {
        facultyId: selectedFaculty,
        batchId: selectedBatch
      }
    });

    setShowTimetable(true);
    
    toast({
      title: "Routine Generated",
      description: "Timetable has been successfully generated for the selected batch.",
    });
  };

  const selectedFacultyData = state.faculties.find(f => f.id === selectedFaculty);
  const availableBatches = selectedFacultyData?.batches || [];
  const facultySubjects = state.subjects.filter(s => s.facultyId === selectedFaculty);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Routine Generator</h1>
          <p className="text-muted-foreground">Generate optimized timetables for your academic programs</p>
        </div>
        {showTimetable && (
          <Button 
            variant="outline" 
            onClick={() => setShowTimetable(false)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure Settings
          </Button>
        )}
      </div>

      {!showTimetable ? (
        <>
          {/* Configuration Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Routine Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Faculty Selection */}
                <div className="space-y-2">
                  <Label htmlFor="faculty">Select Faculty *</Label>
                  <Select value={selectedFaculty} onValueChange={handleFacultyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.faculties.map((faculty) => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Batch Selection */}
                <div className="space-y-2">
                  <Label htmlFor="batch">Select Batch *</Label>
                  <Select 
                    value={selectedBatch} 
                    onValueChange={handleBatchChange}
                    disabled={!selectedFaculty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBatches.map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={generateRoutine}
                  disabled={!selectedFaculty || !selectedBatch}
                  className="bg-gradient-primary shadow-soft"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Routine
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Information */}
          {selectedFaculty && (
            <Card>
              <CardHeader>
                <CardTitle>Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Selected Faculty</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedFacultyData?.name || 'None'}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Available Subjects</h4>
                    <p className="text-sm text-muted-foreground">
                      {facultySubjects.length} subjects
                    </p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Available Teachers</h4>
                    <p className="text-sm text-muted-foreground">
                      {state.teachers.length} teachers
                    </p>
                  </div>
                </div>
                
                {facultySubjects.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Subjects to be scheduled:</h4>
                    <div className="flex flex-wrap gap-2">
                      {facultySubjects.map((subject) => (
                        <span 
                          key={subject.id} 
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {subject.name} ({subject.code})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        /* Timetable View */
        <TimetableGrid 
          facultyId={selectedFaculty} 
          batchId={selectedBatch}
        />
      )}
    </div>
  );
}