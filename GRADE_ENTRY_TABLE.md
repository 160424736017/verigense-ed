# Grade Entry Table Component

## Overview

The Grade Entry Table component is a reusable React component built with TanStack Table (React Table) that provides a feature-rich interface for entering and managing student grades. It includes sorting, filtering, pagination, and column visibility features.

## Features

1. **Sorting**: Click on column headers to sort data
2. **Filtering**: Search students by name
3. **Pagination**: Navigate through pages of data
4. **Column Visibility**: Toggle visibility of columns
5. **Responsive Design**: Works on all screen sizes
6. **Grade Entry**: Input fields for entering grades
7. **Status Indicators**: Visual indicators for grade status

## Usage

### Basic Usage

```tsx
import { GradeEntryTable } from "@/components/grade-entry-table"

export default function MyComponent() {
  return (
    <GradeEntryTable />
  )
}
```

### With Custom Data

```tsx
import { GradeEntryTable } from "@/components/grade-entry-table"

const customData = [
  { 
    id: "1", 
    studentName: "John Doe", 
    studentId: "STU001", 
    assignment: "Math Homework 1", 
    grade: "", 
    maxPoints: 30, 
    status: "pending" 
  },
  // ... more data
]

export default function MyComponent() {
  return (
    <GradeEntryTable data={customData} />
  )
}
```

## Component Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| data | `GradeEntry[]` | Array of grade entry objects | Mock data |

## Data Structure

The component expects an array of objects with the following structure:

```ts
interface GradeEntry {
  id: string
  studentName: string
  studentId: string
  assignment: string
  grade: string | number
  maxPoints: number
  status: "pending" | "submitted" | "graded"
}
```

## Customization

### Columns

The columns are defined in the `columns` array in the component. You can modify this array to change column headers, add new columns, or modify cell rendering.

### Styling

The component uses shadcn/ui components which are styled with Tailwind CSS. You can customize the appearance by modifying the Tailwind classes in the component.

## Integration with Backend

To integrate with a backend API, you would typically:

1. Fetch data from your API and pass it to the component
2. Implement save functionality in the action buttons
3. Handle form submissions for grade entry

Example:

```tsx
import { GradeEntryTable } from "@/components/grade-entry-table"
import { useEffect, useState } from "react"

export default function GradebookPage() {
  const [grades, setGrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch grades from API
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => {
        setGrades(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <GradeEntryTable data={grades} />
  )
}
```

## Dependencies

- `@tanstack/react-table`: For table functionality
- `lucide-react`: For icons
- shadcn/ui components:
  - `Badge`
  - `Button`
  - `Input`
  - `DropdownMenu`
  - `Table`

## File Location

The component is located at `src/components/grade-entry-table.tsx`