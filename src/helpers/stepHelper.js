import { curry } from "lodash";

const getStepIndex = curry((stepList, step) => {
  const stepIndex = stepList.indexOf(step);
  if (stepIndex < 0) {
    throw new Error(`Step "${step}" is not a valid step`);
  }

  return stepIndex;
});

const isStepFirst = curry(
  (stepList, step) => getStepIndex(stepList, step) === 0
);

const isStepLast = curry(
  (stepList, step) => getStepIndex(stepList, step) === stepList.length - 1
);

const getStepPrevious = curry((stepList, step) => {
  const stepIndex = getStepIndex(stepList, step);
  if (isStepFirst(stepList, step)) {
    throw new Error(`Cannot get previous step - "${step}" is the first step`);
  }

  return stepList[stepIndex - 1];
});

const getStepNext = curry((stepList, step) => {
  const stepIndex = getStepIndex(stepList, step);
  if (isStepLast(stepList, step)) {
    throw new Error(`Cannot get next step - "${step}" is the last step`);
  }

  return stepList[stepIndex + 1];
});

const createStepHelper = stepList => ({
  getStepList: () => stepList,
  getStepIndex: getStepIndex(stepList),
  isStepFirst: isStepFirst(stepList),
  isStepLast: isStepLast(stepList),
  getStepPrevious: getStepPrevious(stepList),
  getStepNext: getStepNext(stepList)
});

export default createStepHelper;
