import React, { useState } from 'react';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Faculty, Batch } from '@/contexts/RoutineContext';

interface FacultyFormProps {
  faculty?: Faculty | null;
  onSubmit: (faculty: Omit<Faculty, 'id'>) => void;
  onCancel: () => void;
}

export function FacultyForm({ faculty, onSubmit, onCancel }: FacultyFormProps) {
  const [formData, setFormData] = useState({
    name: faculty?.name || '',
    batches: faculty?.batches || [{ id: Date.now().toString(), name: '', facultyId: '' }]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Faculty name is required';
    }

    if (formData.batches.length === 0) {
      newErrors.batches = 'At least one batch is required';
    }

    formData.batches.forEach((batch, index) => {
      if (!batch.name.trim()) {
        newErrors[`batch_${index}`] = 'Batch name is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const facultyId = faculty?.id || Date.now().toString();
      const batchesWithFacultyId = formData.batches.map(batch => ({
        ...batch,
        facultyId,
        id: batch.id || Date.now().toString() + Math.random()
      }));
      
      onSubmit({
        name: formData.name,
        batches: batchesWithFacultyId
      });
    }
  };

  const addBatch = () => {
    setFormData(prev => ({
      ...prev,
      batches: [
        ...prev.batches,
        { id: Date.now().toString() + Math.random(), name: '', facultyId: '' }
      ]
    }));
  };

  const removeBatch = (index: number) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.filter((_, i) => i !== index)
    }));
  };

  const updateBatch = (index: number, name: string) => {
    setFormData(prev => ({
      ...prev,
      batches: prev.batches.map((batch, i) => 
        i === index ? { ...batch, name } : batch
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Faculties
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {faculty ? 'Edit Faculty' : 'Add New Faculty'}
          </h1>
          <p className="text-muted-foreground">
            {faculty ? 'Update faculty information and batches' : 'Create a new faculty and define its batches'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Faculty Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Faculty Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={errors.name ? 'border-destructive' : ''}
                placeholder="e.g., Science, Management, Humanities"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Batches */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Batches *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addBatch}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Batch
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.batches.map((batch, index) => (
                  <div key={batch.id} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={batch.name}
                        onChange={(e) => updateBatch(index, e.target.value)}
                        className={errors[`batch_${index}`] ? 'border-destructive' : ''}
                        placeholder={`Batch ${String.fromCharCode(65 + index)}`}
                      />
                      {errors[`batch_${index}`] && (
                        <p className="text-sm text-destructive mt-1">{errors[`batch_${index}`]}</p>
                      )}
                    </div>
                    {formData.batches.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBatch(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {errors.batches && (
                <p className="text-sm text-destructive">{errors.batches}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                {faculty ? 'Update Faculty' : 'Add Faculty'}
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