export interface ClassOptionGroup {
  group: string;
  options: { label: string; value: string }[];
}

export const SPIC_CLASS_STRUCTURE: ClassOptionGroup[] = [
  {
    group: 'Class VI (Sections A to D)',
    options: [
      { label: 'Class VI - Sec A', value: 'VI A' },
      { label: 'Class VI - Sec B', value: 'VI B' },
      { label: 'Class VI - Sec C', value: 'VI C' },
      { label: 'Class VI - Sec D', value: 'VI D' }
    ]
  },
  {
    group: 'Class VII (Sections A to D)',
    options: [
      { label: 'Class VII - Sec A', value: 'VII A' },
      { label: 'Class VII - Sec B', value: 'VII B' },
      { label: 'Class VII - Sec C', value: 'VII C' },
      { label: 'Class VII - Sec D', value: 'VII D' }
    ]
  },
  {
    group: 'Class VIII (Sections A to D)',
    options: [
      { label: 'Class VIII - Sec A', value: 'VIII A' },
      { label: 'Class VIII - Sec B', value: 'VIII B' },
      { label: 'Class VIII - Sec C', value: 'VIII C' },
      { label: 'Class VIII - Sec D', value: 'VIII D' }
    ]
  },
  {
    group: 'Class IX (Sections A to D)',
    options: [
      { label: 'Class IX - Sec A', value: 'IX A' },
      { label: 'Class IX - Sec B', value: 'IX B' },
      { label: 'Class IX - Sec C', value: 'IX C' },
      { label: 'Class IX - Sec D', value: 'IX D' }
    ]
  },
  {
    group: 'Class X (Sections A to D)',
    options: [
      { label: 'Class X - Sec A (10 A)', value: '10 A' },
      { label: 'Class X - Sec B (10 B)', value: '10 B' },
      { label: 'Class X - Sec C (10 C)', value: '10 C' },
      { label: 'Class X - Sec D (10 D)', value: '10 D' },
      { label: 'Class X - Sec A (X A)', value: 'X A' },
      { label: 'Class X - Sec B (X B)', value: 'X B' }
    ]
  },
  {
    group: 'Class XI (Higher Secondary)',
    options: [
      { label: 'Class XI - Sec A-CS (Computer Science)', value: 'XI A-CS' },
      { label: 'Class XI - Sec B-CS (Computer Science)', value: 'XI B-CS' },
      { label: 'Class XI - Sec C-BIO (Biology)', value: 'XI C-BIO' },
      { label: 'Class XI - Sec D-CA (Computer Applications)', value: 'XI D-CA' },
      { label: 'Class XI - Sec D-BM (Business Mathematics)', value: 'XI D-BM' },
      { label: 'Class 11 - Sec A-CS', value: '11 A-CS' },
      { label: 'Class 11 - Sec B-CS', value: '11 B-CS' },
      { label: 'Class 11 - Sec C-BIO', value: '11 C-BIO' },
      { label: 'Class 11 - Sec D-CA', value: '11 D-CA' },
      { label: 'Class 11 - Sec D-BM', value: '11 D-BM' }
    ]
  },
  {
    group: 'Class XII (Higher Secondary)',
    options: [
      { label: 'Class XII - Sec A-CS (Computer Science)', value: 'XII A-CS' },
      { label: 'Class XII - Sec B-CS (Computer Science)', value: 'XII B-CS' },
      { label: 'Class XII - Sec C-BIO (Biology)', value: 'XII C-BIO' },
      { label: 'Class XII - Sec D-CA (Computer Applications)', value: 'XII D-CA' },
      { label: 'Class XII - Sec D-BM (Business Mathematics)', value: 'XII D-BM' },
      { label: 'Class 12 - Sec A-CS', value: '12 A-CS' },
      { label: 'Class 12 - Sec B-CS', value: '12 B-CS' },
      { label: 'Class 12 - Sec C-BIO', value: '12 C-BIO' },
      { label: 'Class 12 - Sec D-CA', value: '12 D-CA' },
      { label: 'Class 12 - Sec D-BM', value: '12 D-BM' }
    ]
  }
];

export const ALL_SPIC_CLASS_VALUES: string[] = [
  'VI A', 'VI B', 'VI C', 'VI D',
  'VII A', 'VII B', 'VII C', 'VII D',
  'VIII A', 'VIII B', 'VIII C', 'VIII D',
  'IX A', 'IX B', 'IX C', 'IX D',
  '10 A', '10 B', '10 C', '10 D', 'X A', 'X B', 'X C', 'X D',
  'XI A-CS', 'XI B-CS', 'XI C-BIO', 'XI D-CA', 'XI D-BM',
  '11 A-CS', '11 B-CS', '11 C-BIO', '11 D-CA', '11 D-BM',
  'XII A-CS', 'XII B-CS', 'XII C-BIO', 'XII D-CA', 'XII D-BM',
  '12 A-CS', '12 B-CS', '12 C-BIO', '12 D-CA', '12 D-BM'
];
