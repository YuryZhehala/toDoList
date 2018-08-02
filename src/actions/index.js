export const TEST_ACTION = 'TEST_ACTION';

export const testAction = payload => {
  return {
    type: TEST_ACTION,
    payload,
  };
};
