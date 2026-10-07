export interface Workout {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
}
export interface PlanItem extends Workout { done?: boolean }
