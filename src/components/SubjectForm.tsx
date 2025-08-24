import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRoutine, Subject } from '@/contexts/RoutineContext';

interface SubjectFormProps {
  subject?: Subject | null;
  onSubmit: (subject: Omit<Subject, 'id'>) => void;
  onCancel: () => void;
}

export function SubjectForm({ subject, onSubmit, onCancel }: SubjectFormProps) {
  const { state } = useRoutine();
  const [formData, setFormData] = useState({
    name: subject?.name || '',
    code: subject?.code || '',
    facultyId: subject?.facultyId || '',
    credits: subject?.credits || 3
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Subject name is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Subject code is required';
    }

    if (!formData.facultyId) {
      newErrors.facultyId = 'Faculty selection is required';
    }

    if (formData.credits < 1 || formData.credits > 6) {
      newErrors.credits = 'Credits must be between 1 and 6';
    }

    // Check for duplicate subject codes in the same faculty
    const existingSubject = state.subjects.find(s => 
      s.code.toLowerCase() === formData.code.toLowerCase() && 
      s.facultyId === formData.facultyId &&
      s.id !== subject?.id
    );
    
    if (existingSubject) {
      newErrors.code = 'Subject code already exists in this faculty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Subjects
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {subject ? 'Edit Subject' : 'Add New Subject'}
          </h1>
          <p className="text-muted-foreground">
            {subject ? 'Update subject information' : 'Create a new subject for a faculty'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={errors.name ? 'border-destructive' : ''}
                placeholder="e.g., Introduction to Physics"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Subject Code */}
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code *</Label>
              <Input
                id="code"
                type="text"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                className={errors.code ? 'border-destructive' : ''}
                placeholder="e.g., PHY101"
              />
              {errors.code && (
                <p className="text-sm text-destructive">{errors.code}</p>
              )}
            </div>

            {/* Faculty Selection */}
            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty *</Label>
              <Select
                value={formData.facultyId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, facultyId: value }))}
              >
                <SelectTrigger className={errors.facultyId ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select a faculty" />
                </SelectTrigger>
                <SelectContent>
                  {state.faculties.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.facultyId && (
                <p className="text-sm text-destructive">{errors.facultyId}</p>
              )}
            </div>

            {/* Credits */}
            <div className="space-y-2">
              <Label htmlFor="credits">Credits *</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData(prev => ({ ...prev, credits: parseInt(e.target.value) || 3 }))}
                className={errors.credits ? 'border-destructive' : ''}
              />
              {errors.credits && (
                <p className="text-sm text-destructive">{errors.credits}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Number of credit hours for this subject (1-6)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                {subject ? 'Update Subject' : 'Add Subject'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}