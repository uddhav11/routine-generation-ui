import React from 'react';
import { Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRoutine } from '@/contexts/RoutineContext';

export function Dashboard() {
  const { state } = useRoutine();

  const stats = [
    {
      title: 'Total Teachers',
      value: state.teachers.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Faculties',
      value: state.faculties.length,
      icon: GraduationCap,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Total Subjects',
      value: state.subjects.length,
      icon: BookOpen,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Active Routines',
      value: state.timetableEntries.length > 0 ? 1 : 0,
      icon: Calendar,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const recentActivity = [
    'System initialized with sample data',
    'Ready to manage teachers and subjects',
    'Faculty structure created',
    'Waiting for routine generation'
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white shadow-medium">
        <h1 className="text-2xl font-bold mb-2">Welcome to RoutinePro</h1>
        <p className="text-white/90">
          Manage your educational institution's schedule with ease. Create and organize teacher assignments, 
          faculty structures, and generate optimized timetables.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-medium transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Add New Teacher</p>
                <p className="text-sm text-muted-foreground">Register a new faculty member</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <BookOpen className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Create Subject</p>
                <p className="text-sm text-muted-foreground">Add a new course subject</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
              <Calendar className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium">Generate Routine</p>
                <p className="text-sm text-muted-foreground">Create a new timetable</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-sm text-muted-foreground">{activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.faculties.map((faculty) => (
              <div key={faculty.id} className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-semibold mb-2">{faculty.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {faculty.batches.length} batches
                </p>
                <div className="space-y-1">
                  {faculty.batches.map((batch) => (
                    <div key={batch.id} className="text-xs bg-background px-2 py-1 rounded">
                      {batch.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}