import React from 'react';
import { Clock, User, MapPin, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRoutine } from '@/contexts/RoutineContext';

interface TimetableGridProps {
  facultyId: string;
  batchId: string;
}

export function TimetableGrid({ facultyId, batchId }: TimetableGridProps) {
  const { state } = useRoutine();

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Filter timetable entries for this faculty and batch
  const timetableEntries = state.timetableEntries.filter(
    entry => entry.facultyId === facultyId && entry.batchId === batchId
  );

  const faculty = state.faculties.find(f => f.id === facultyId);
  const batch = faculty?.batches.find(b => b.id === batchId);

  const getCellContent = (day: string, timeSlotId: string) => {
    const entry = timetableEntries.find(
      e => e.day === day && e.timeSlotId === timeSlotId
    );
    
    if (!entry) return null;

    const subject = state.subjects.find(s => s.id === entry.subjectId);
    const teacher = state.teachers.find(t => t.id === entry.teacherId);
    
    return {
      subject,
      teacher,
      room: entry.room,
      entry
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Timetable - {faculty?.name} Faculty, {batch?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {timetableEntries.length} scheduled classes
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {new Set(timetableEntries.map(e => e.teacherId)).size} teachers involved
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="p-4 text-left font-semibold min-w-[120px] border-r">
                    Time Slot
                  </th>
                  {days.map((day) => (
                    <th key={day} className="p-4 text-center font-semibold min-w-[180px] border-r last:border-r-0">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.timeSlots.map((timeSlot) => (
                  <tr key={timeSlot.id} className="border-b hover:bg-muted/10">
                    <td className="p-4 border-r bg-muted/10 font-medium">
                      <div className="text-sm">
                        <div>{timeSlot.startTime} - {timeSlot.endTime}</div>
                      </div>
                    </td>
                    {days.map((day) => {
                      const cellContent = getCellContent(day, timeSlot.id);
                      
                      return (
                        <td key={day} className="p-2 border-r last:border-r-0 align-top">
                          {cellContent ? (
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 min-h-[80px] hover:shadow-soft transition-shadow">
                              <div className="space-y-2">
                                {/* Subject */}
                                <div className="font-semibold text-sm text-primary">
                                  {cellContent.subject?.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {cellContent.subject?.code}
                                </div>
                                
                                {/* Teacher */}
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <User className="w-3 h-3 mr-1" />
                                  {cellContent.teacher?.name}
                                </div>
                                
                                {/* Room */}
                                {cellContent.room && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {cellContent.room}
                                  </div>
                                )}
                                
                                {/* Credits badge */}
                                <Badge variant="secondary" className="text-xs">
                                  {cellContent.subject?.credits} credits
                                </Badge>
                              </div>
                            </div>
                          ) : (
                            <div className="min-h-[80px] flex items-center justify-center text-xs text-muted-foreground">
                              Free
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Schedule Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Classes:</span>
              <span className="font-semibold">{timetableEntries.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Credits:</span>
              <span className="font-semibold">
                {timetableEntries.reduce((total, entry) => {
                  const subject = state.subjects.find(s => s.id === entry.subjectId);
                  return total + (subject?.credits || 0);
                }, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days with Classes:</span>
              <span className="font-semibold">
                {new Set(timetableEntries.map(e => e.day)).size}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teachers Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(timetableEntries.map(e => e.teacherId))).map(teacherId => {
                const teacher = state.teachers.find(t => t.id === teacherId);
                const teacherClasses = timetableEntries.filter(e => e.teacherId === teacherId);
                
                return teacher ? (
                  <div key={teacherId} className="flex justify-between items-center p-2 bg-muted/20 rounded">
                    <span className="text-sm font-medium">{teacher.name}</span>
                    <Badge variant="outline">{teacherClasses.length} classes</Badge>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}