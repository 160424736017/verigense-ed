# Date Picker Components

This document explains the date picker components that have been added to the Verigense Edu platform. These components provide consistent and reusable date selection functionality throughout the application.

## Components Overview

### 1. DatePicker
A simple date picker that allows users to select a single date.

**Props:**
- `date` (Date | undefined): The currently selected date
- `onDateChange` ((date: Date | undefined) => void): Callback function when date changes
- `placeholder` (string, optional): Placeholder text (defaults to "Pick a date")
- `className` (string, optional): Additional CSS classes
- `disabled` (boolean, optional): Whether the picker is disabled

**Usage:**
```tsx
import { DatePicker } from "@/components/date-picker"

export function MyComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  
  return (
    <DatePicker 
      date={date} 
      onDateChange={setDate} 
      placeholder="Select a date" 
    />
  )
}
```

### 2. DateTimePicker
An enhanced date picker that also allows time selection.

**Props:**
- `date` (Date | undefined): The currently selected date and time
- `onDateChange` ((date: Date | undefined) => void): Callback function when date/time changes
- `placeholder` (string, optional): Placeholder text (defaults to "Pick a date")
- `className` (string, optional): Additional CSS classes
- `showTimePicker` (boolean, optional): Whether to show the time picker (defaults to false)
- `disabled` (boolean, optional): Whether the picker is disabled

**Usage:**
```tsx
import { DateTimePicker } from "@/components/date-time-picker"

export function MyComponent() {
  const [dateTime, setDateTime] = React.useState<Date | undefined>(new Date())
  
  return (
    <DateTimePicker 
      date={dateTime} 
      onDateChange={setDateTime} 
      placeholder="Select a date and time" 
      showTimePicker={true}
    />
  )
}
```

### 3. DateRangePicker
A date picker that allows users to select a range of dates.

**Props:**
- `dateRange` (DateRange | undefined): The currently selected date range
- `onDateRangeChange` ((dateRange: DateRange | undefined) => void): Callback function when date range changes
- `placeholder` (string, optional): Placeholder text (defaults to "Pick a date range")
- `className` (string, optional): Additional CSS classes
- `disabled` (boolean, optional): Whether the picker is disabled

**Usage:**
```tsx
import { DateRangePicker } from "@/components/date-range-picker"
import { DateRange } from "react-day-picker"

export function MyComponent() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7))
  })
  
  return (
    <DateRangePicker 
      dateRange={dateRange} 
      onDateRangeChange={setDateRange} 
      placeholder="Select a date range" 
    />
  )
}
```

## Implementation Details

All date picker components follow the platform's design system and use:
- Tailwind CSS for styling
- Radix UI components for accessibility
- Lucide React icons for UI elements
- React hooks for state management

## Usage Guidelines

1. **Consistency**: Use these components whenever date selection is required in the application
2. **Accessibility**: All components are keyboard accessible and screen reader friendly
3. **Responsive**: Components adapt to different screen sizes
4. **Theming**: Components automatically adapt to light/dark mode

## Example Use Cases

1. **Student Dashboard**: Assignment due dates
2. **Teacher Dashboard**: Class schedules, exam dates
3. **Attendance Pages**: Date selection for attendance records
4. **Exam Management**: Exam scheduling
5. **Fee Management**: Payment due dates
6. **Reports**: Date range selection for generating reports

## Future Enhancements

Potential improvements that could be made:
1. Add localization support for different date formats
2. Add validation props for min/max dates
3. Add support for disabled date ranges
4. Add keyboard shortcuts for common date selections