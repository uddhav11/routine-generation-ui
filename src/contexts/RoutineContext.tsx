import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Teacher {
  id: string;
  name: string;
  email: string;
  availableDays: string[];
  availableTimeSlots: string[];
}

export interface Faculty {
  id: string;
  name: string;
  batches: Batch[];
}

export interface Batch {
  id: string;
  name: string;
  facultyId: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  credits: number;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  label: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  timeSlotId: string;
  subjectId: string;
  teacherId: string;
  room?: string;
  batchId: string;
  facultyId: string;
}

export interface RoutineState {
  teachers: Teacher[];
  faculties: Faculty[];
  subjects: Subject[];
  timeSlots: TimeSlot[];
  timetableEntries: TimetableEntry[];
  selectedFaculty: string | null;
  selectedBatch: string | null;
}

// Action Types
type RoutineAction =
  | { type: 'ADD_TEACHER'; payload: Teacher }
  | { type: 'UPDATE_TEACHER'; payload: Teacher }
  | { type: 'DELETE_TEACHER'; payload: string }
  | { type: 'ADD_FACULTY'; payload: Faculty }
  | { type: 'UPDATE_FACULTY'; payload: Faculty }
  | { type: 'DELETE_FACULTY'; payload: string }
  | { type: 'ADD_SUBJECT'; payload: Subject }
  | { type: 'UPDATE_SUBJECT'; payload: Subject }
  | { type: 'DELETE_SUBJECT'; payload: string }
  | { type: 'ADD_TIMETABLE_ENTRY'; payload: TimetableEntry }
  | { type: 'UPDATE_TIMETABLE_ENTRY'; payload: TimetableEntry }
  | { type: 'DELETE_TIMETABLE_ENTRY'; payload: string }
  | { type: 'SET_SELECTED_FACULTY'; payload: string | null }
  | { type: 'SET_SELECTED_BATCH'; payload: string | null }
  | { type: 'GENERATE_ROUTINE'; payload: { facultyId: string; batchId: string } };

// Sample Data
const SAMPLE_TIME_SLOTS: TimeSlot[] = [
  { id: '1', startTime: '08:00', endTime: '09:00', label: '8:00 - 9:00 AM' },
  { id: '2', startTime: '09:00', endTime: '10:00', label: '9:00 - 10:00 AM' },
  { id: '3', startTime: '10:00', endTime: '11:00', label: '10:00 - 11:00 AM' },
  { id: '4', startTime: '11:00', endTime: '12:00', label: '11:00 - 12:00 PM' },
  { id: '5', startTime: '12:00', endTime: '13:00', label: '12:00 - 1:00 PM' },
  { id: '6', startTime: '13:00', endTime: '14:00', label: '1:00 - 2:00 PM' },
  { id: '7', startTime: '14:00', endTime: '15:00', label: '2:00 - 3:00 PM' },
  { id: '8', startTime: '15:00', endTime: '16:00', label: '3:00 - 4:00 PM' },
];

const SAMPLE_TEACHERS: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['1', '2', '3', '4', '6', '7']
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['1', '2', '3', '4']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['2', '3', '4', '6', '7', '8']
  },
  {
    id: '4',
    name: 'Prof. David Wilson',
    email: 'david.wilson@university.edu',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableTimeSlots: ['1', '2', '6', '7', '8']
  }
];

const SAMPLE_FACULTIES: Faculty[] = [
  {
    id: '1',
    name: 'Science',
    batches: [
      { id: '1', name: 'Batch A', facultyId: '1' },
      { id: '2', name: 'Batch B', facultyId: '1' },
      { id: '3', name: 'Batch C', facultyId: '1' }
    ]
  },
  {
    id: '2',
    name: 'Management',
    batches: [
      { id: '4', name: 'Batch A', facultyId: '2' },
      { id: '5', name: 'Batch B', facultyId: '2' }
    ]
  },
  {
    id: '3',
    name: 'Humanities',
    batches: [
      { id: '6', name: 'Batch A', facultyId: '3' },
      { id: '7', name: 'Batch B', facultyId: '3' },
      { id: '8', name: 'Batch C', facultyId: '3' }
    ]
  }
];

const SAMPLE_SUBJECTS: Subject[] = [
  // Science subjects
  { id: '1', name: 'Physics', code: 'PHY101', facultyId: '1', credits: 3 },
  { id: '2', name: 'Chemistry', code: 'CHE101', facultyId: '1', credits: 3 },
  { id: '3', name: 'Mathematics', code: 'MAT101', facultyId: '1', credits: 4 },
  { id: '4', name: 'Biology', code: 'BIO101', facultyId: '1', credits: 3 },
  
  // Management subjects
  { id: '5', name: 'Business Administration', code: 'BUS101', facultyId: '2', credits: 3 },
  { id: '6', name: 'Economics', code: 'ECO101', facultyId: '2', credits: 3 },
  { id: '7', name: 'Marketing', code: 'MKT101', facultyId: '2', credits: 3 },
  { id: '8', name: 'Finance', code: 'FIN101', facultyId: '2', credits: 3 },
  
  // Humanities subjects
  { id: '9', name: 'English Literature', code: 'ENG101', facultyId: '3', credits: 3 },
  { id: '10', name: 'History', code: 'HIS101', facultyId: '3', credits: 3 },
  { id: '11', name: 'Philosophy', code: 'PHI101', facultyId: '3', credits: 3 },
  { id: '12', name: 'Psychology', code: 'PSY101', facultyId: '3', credits: 3 }
];

// Initial State
const initialState: RoutineState = {
  teachers: SAMPLE_TEACHERS,
  faculties: SAMPLE_FACULTIES,
  subjects: SAMPLE_SUBJECTS,
  timeSlots: SAMPLE_TIME_SLOTS,
  timetableEntries: [],
  selectedFaculty: null,
  selectedBatch: null
};

// Reducer
function routineReducer(state: RoutineState, action: RoutineAction): RoutineState {
  switch (action.type) {
    case 'ADD_TEACHER':
      return { ...state, teachers: [...state.teachers, action.payload] };
    
    case 'UPDATE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.id ? action.payload : teacher
        )
      };
    
    case 'DELETE_TEACHER':
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload)
      };
    
    case 'ADD_FACULTY':
      return { ...state, faculties: [...state.faculties, action.payload] };
    
    case 'UPDATE_FACULTY':
      return {
        ...state,
        faculties: state.faculties.map(faculty =>
          faculty.id === action.payload.id ? action.payload : faculty
        )
      };
    
    case 'DELETE_FACULTY':
      return {
        ...state,
        faculties: state.faculties.filter(faculty => faculty.id !== action.payload)
      };
    
    case 'ADD_SUBJECT':
      return { ...state, subjects: [...state.subjects, action.payload] };
    
    case 'UPDATE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.map(subject =>
          subject.id === action.payload.id ? action.payload : subject
        )
      };
    
    case 'DELETE_SUBJECT':
      return {
        ...state,
        subjects: state.subjects.filter(subject => subject.id !== action.payload)
      };
    
    case 'ADD_TIMETABLE_ENTRY':
      return { ...state, timetableEntries: [...state.timetableEntries, action.payload] };
    
    case 'UPDATE_TIMETABLE_ENTRY':
      return {
        ...state,
        timetableEntries: state.timetableEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        )
      };
    
    case 'DELETE_TIMETABLE_ENTRY':
      return {
        ...state,
        timetableEntries: state.timetableEntries.filter(entry => entry.id !== action.payload)
      };
    
    case 'SET_SELECTED_FACULTY':
      return { ...state, selectedFaculty: action.payload, selectedBatch: null };
    
    case 'SET_SELECTED_BATCH':
      return { ...state, selectedBatch: action.payload };
    
    case 'GENERATE_ROUTINE':
      // Simple routine generation algorithm
      const { facultyId, batchId } = action.payload;
      const facultySubjects = state.subjects.filter(s => s.facultyId === facultyId);
      const availableTeachers = state.teachers;
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const newEntries: TimetableEntry[] = [];
      
      // Clear existing entries for this batch
      const filteredEntries = state.timetableEntries.filter(
        entry => !(entry.batchId === batchId && entry.facultyId === facultyId)
      );
      
      // Generate new entries
      facultySubjects.forEach((subject, index) => {
        const day = days[index % days.length];
        const timeSlot = state.timeSlots[index % state.timeSlots.length];
        const teacher = availableTeachers[index % availableTeachers.length];
        
        newEntries.push({
          id: `${Date.now()}-${index}`,
          day,
          timeSlotId: timeSlot.id,
          subjectId: subject.id,
          teacherId: teacher.id,
          room: `Room ${100 + index}`,
          batchId,
          facultyId
        });
      });
      
      return {
        ...state,
        timetableEntries: [...filteredEntries, ...newEntries]
      };
    
    default:
      return state;
  }
}

// Context
const RoutineContext = createContext<{
  state: RoutineState;
  dispatch: React.Dispatch<RoutineAction>;
} | null>(null);

// Provider
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(routineReducer, initialState);

  return (
    <RoutineContext.Provider value={{ state, dispatch }}>
      {children}
    </RoutineContext.Provider>
  );
}

// Hook
export function useRoutine() {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutine must be used within a RoutineProvider');
  }
  return context;
}