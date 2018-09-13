import { curry } from "lodash";

const getStepIndex = curry((steps, step) => {
  const stepIndex = steps.indexOf(step);
  if (stepIndex < 0) {
    throw new Error(`Step "${step}" is not a valid step`);
  }

  return stepIndex;
});

const isStepFirst = curry((steps, step) => getStepIndex(steps, step) === 0);

const isStepLast = curry(
  (steps, step) => getStepIndex(steps, step) === steps.length - 1
);

const getStepPrevious = curry((steps, step) => {
  const stepIndex = getStepIndex(steps, step);
  if (isStepFirst(steps, step)) {
    throw new Error(`Cannot get previous step - "${step}" is the first step`);
  }

  return steps[stepIndex - 1];
});

const getStepNext = curry((steps, step) => {
  const stepIndex = getStepIndex(steps, step);
  if (isStepLast(steps, step)) {
    throw new Error(`Cannot get next step - "${step}" is the last step`);
  }

  return steps[stepIndex + 1];
});

const createStepHelper = steps => ({
  getSteps: () => steps,
  getStepIndex: getStepIndex(steps),
  isStepFirst: isStepFirst(steps),
  isStepLast: isStepLast(steps),
  getStepPrevious: getStepPrevious(steps),
  getStepNext: getStepNext(steps)
});

export default createStepHelper;
