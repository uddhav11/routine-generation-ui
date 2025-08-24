import React, { useState } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRoutine, Teacher } from '@/contexts/RoutineContext';

interface TeacherFormProps {
  teacher?: Teacher | null;
  onSubmit: (teacher: Omit<Teacher, 'id'>) => void;
  onCancel: () => void;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function TeacherForm({ teacher, onSubmit, onCancel }: TeacherFormProps) {
  const { state } = useRoutine();
  const [formData, setFormData] = useState({
    name: teacher?.name || '',
    email: teacher?.email || '',
    availableDays: teacher?.availableDays || [],
    availableTimeSlots: teacher?.availableTimeSlots || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.availableDays.length === 0) {
      newErrors.availableDays = 'At least one available day must be selected';
    }

    if (formData.availableTimeSlots.length === 0) {
      newErrors.availableTimeSlots = 'At least one time slot must be selected';
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

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, day]
        : prev.availableDays.filter(d => d !== day)
    }));
  };

  const handleTimeSlotChange = (timeSlotId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      availableTimeSlots: checked
        ? [...prev.availableTimeSlots, timeSlotId]
        : prev.availableTimeSlots.filter(id => id !== timeSlotId)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teachers
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {teacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h1>
          <p className="text-muted-foreground">
            {teacher ? 'Update teacher information and availability' : 'Enter teacher details and set their availability'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Teacher Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-destructive' : ''}
                  placeholder="Enter teacher's full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="teacher@university.edu"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Available Days */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Available Days *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={formData.availableDays.includes(day)}
                      onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                    />
                    <Label htmlFor={day} className="text-sm font-normal cursor-pointer">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.availableDays && (
                <p className="text-sm text-destructive">{errors.availableDays}</p>
              )}
            </div>

            {/* Available Time Slots */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Available Time Slots *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {state.timeSlots.map((timeSlot) => (
                  <div key={timeSlot.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={timeSlot.id}
                      checked={formData.availableTimeSlots.includes(timeSlot.id)}
                      onCheckedChange={(checked) => handleTimeSlotChange(timeSlot.id, checked as boolean)}
                    />
                    <Label htmlFor={timeSlot.id} className="text-sm font-normal cursor-pointer">
                      {timeSlot.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.availableTimeSlots && (
                <p className="text-sm text-destructive">{errors.availableTimeSlots}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                {teacher ? 'Update Teacher' : 'Add Teacher'}
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