import expenses from '../fixtures/expenses';
import selectExpenseTotal from '../../selectors/expenses-total';

test('should return 0 if no expense ', () => {
    const total = selectExpenseTotal([]);
    expect(total).toBe(0);
  });

test('should correctly add up a single expense',()=>{
    const total = selectExpenseTotal([expenses[0]]);
    expect(total).toBe(195);
});

test('should correctly add up a multiple expense',()=>{
    const total = selectExpenseTotal(expenses);
    expect(total).toBe(114195);
});