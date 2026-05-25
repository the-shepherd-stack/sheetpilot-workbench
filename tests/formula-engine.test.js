import test from 'node:test';
import assert from 'node:assert/strict';
import { explainFormula, fixFormula, generateFormula, normalizeHeaders, validateFormula } from '../app/formula-engine.js';

test('normalizeHeaders maps pasted table headers to spreadsheet columns', () => {
  assert.deepEqual(normalizeHeaders('Customer,Plan,Price\nAcme,Pro,29'), [
    { label: 'Customer', letter: 'A' },
    { label: 'Plan', letter: 'B' },
    { label: 'Price', letter: 'C' }
  ]);
});

test('generateFormula creates a lookup formula from a lookup task', () => {
  const result = generateFormula({
    task: 'look up each customer plan and return price',
    platform: 'excel',
    rawTable: 'Customer,Plan,Price\nAcme,Pro,29',
    range: 'A2:C100; result in D2',
    hint: 'XLOOKUP'
  });

  assert.match(result.formula, /^=XLOOKUP/);
  assert.match(result.explanation, /Looks up/);
  assert.match(result.compatibility, /modern Excel/);
  assert.ok(result.steps.length >= 3);
  assert.deepEqual(result.checks, []);
});

test('generateFormula creates a SUMIFS formula from structured invoice context', () => {
  const result = generateFormula({
    task: 'sum paid invoices this month',
    platform: 'excel',
    rawTable: 'Invoice Date,Status,Amount\n2026-05-04,Paid,1200',
    hint: 'SUMIFS'
  });

  assert.match(result.formula, /^=SUMIFS/);
  assert.match(result.formula, /EOMONTH/);
  assert.match(result.explanation, /Paid/);
});

test('generateFormula creates a COUNTIFS formula from multi-criteria context', () => {
  const result = generateFormula({
    task: 'count how many customers are Active and have revenue above 1000',
    platform: 'excel',
    rawTable: 'Customer,Status,Revenue\nAcme,Active,1200',
    range: 'A2:C500; result in F2',
    hint: 'COUNTIFS'
  });

  assert.match(result.formula, /^=COUNTIFS/);
  assert.match(result.formula, /B2:B100,"Active"/);
  assert.match(result.formula, /C2:C100,">1000"/);
  assert.match(result.explanation, /greater than 1000/);
});

test('generateFormula creates percentage change formulas', () => {
  const result = generateFormula({
    task: 'calculate percentage growth',
    platform: 'sheets',
    rawTable: 'Month,Old,New\nJan,10,15'
  });

  assert.equal(result.formula, '=IFERROR((C2-B2)/B2,0)');
  assert.match(result.compatibility, /Google Sheets/);
});

test('validateFormula catches common syntax problems', () => {
  const issues = validateFormula('SUM(A2:A10');

  assert.ok(issues.some((issue) => issue.includes('Add "="')));
  assert.ok(issues.some((issue) => issue.includes('unbalanced')));
});

test('explainFormula describes common spreadsheet functions', () => {
  assert.match(explainFormula('=VLOOKUP(A2,A2:C100,2,FALSE)'), /Finds a value/);
});

test('fixFormula wraps lookups with a readable fallback', () => {
  const result = fixFormula('=XLOOKUP(A2,Customers!A:A,Customers!C:C)');

  assert.match(result.formula, /^=IFERROR\(XLOOKUP/);
  assert.match(result.explanation, /Wraps the lookup/);
  assert.deepEqual(result.checks, []);
});
