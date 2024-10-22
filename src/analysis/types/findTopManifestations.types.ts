type DemoRatingObj = {
  demonstrationsId: string;
  name: string;
};

export type DemoRating = {
  first: DemoRatingObj | null;
  second: DemoRatingObj | null;
  third: DemoRatingObj | null;
}
