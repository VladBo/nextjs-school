'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const SUBJECTS = [
  'Math',
  'Science',
  'History',
  'English',
  'Geography',
  'Other',
];

export function QuizFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentGrade = searchParams.get('grade') || '';
  const currentSubject = searchParams.get('subject') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/quizzes?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/quizzes');
  };

  return (
    <div className="space-y-6 rounded-lg border bg-card p-6">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          {(currentGrade || currentSubject) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Label className="mb-3 block text-sm font-medium">Grade</Label>
            <RadioGroup
              value={currentGrade}
              onValueChange={(value) =>
                updateFilters('grade', value === currentGrade ? '' : value)
              }
            >
              <div className="grid gap-2">
                {GRADES.map((grade) => (
                  <div key={grade} className="flex items-center space-x-2">
                    <RadioGroupItem value={grade} id={`grade-${grade}`} />
                    <Label
                      htmlFor={`grade-${grade}`}
                      className="cursor-pointer font-normal"
                    >
                      Grade {grade}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block text-sm font-medium">Subject</Label>
            <RadioGroup
              value={currentSubject}
              onValueChange={(value) =>
                updateFilters('subject', value === currentSubject ? '' : value)
              }
            >
              <div className="grid gap-2">
                {SUBJECTS.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <RadioGroupItem value={subject} id={`subject-${subject}`} />
                    <Label
                      htmlFor={`subject-${subject}`}
                      className="cursor-pointer font-normal"
                    >
                      {subject}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
