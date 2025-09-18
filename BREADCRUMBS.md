# Breadcrumb Implementation Guide

This document explains how to implement breadcrumbs in the Verigense Education Platform.

## Overview

We have implemented a dynamic breadcrumb system that automatically generates breadcrumbs based on the current URL path and navigation structure.

## Dynamic Breadcrumb Component (Active)

The [DynamicBreadcrumb](file:///c:/Users/User/Desktop/hellyeah/verigense-ed/src/components/dynamic-breadcrumb.tsx#L23-L154) component automatically generates breadcrumbs based on the current URL path and navigation structure.

### How It Works

1. Uses the `usePathname()` hook from Next.js to get the current path
2. Gets navigation items based on the user's role
3. Maps URL segments to breadcrumb items
4. Automatically formats segment names for display

### Current Features

- Fully functional with role-based navigation
- Automatically integrated into the SiteHeader component
- Works with all role types (student, teacher, admin)
- Responsive design that adapts to different screen sizes
- Proper accessibility attributes

### Usage

The dynamic breadcrumb is automatically included in the [SiteHeader](file:///c:/Users/User/Desktop/hellyeah/verigense-ed/src/components/site-header.tsx#L13-L23) component, so it appears on all pages that use the SiteHeader.

## Implementation Across the Platform

### Site Header Integration

The breadcrumbs are integrated into the [SiteHeader](file:///c:/Users/User/Desktop/hellyeah/verigense-ed/src/components/site-header.tsx#L13-L23) component, which is used across all pages. The SiteHeader is a client component that uses the useRole hook to determine the current user's role and passes it to the DynamicBreadcrumb component.

### Role-Based Navigation

The breadcrumb system respects role-based navigation:
- Student breadcrumbs will show student-specific paths
- Teacher breadcrumbs will show teacher-specific paths
- Admin breadcrumbs will show admin-specific paths

## Best Practices

1. **Consistency**: Use the same breadcrumb pattern across all pages
2. **Hierarchy**: Maintain proper hierarchical structure (Home > Section > Page)
3. **Current Page**: The current page should be the last item without a link
4. **Clarity**: Use clear, descriptive titles for breadcrumb items
5. **Responsiveness**: Breadcrumbs automatically adapt to different screen sizes

## Adding Breadcrumbs to New Pages

Simply include the SiteHeader component in your page:

```tsx
import { SiteHeader } from "@/components/site-header"

export default function MyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      {/* Rest of your page content */}
    </div>
  )
}
```

The dynamic breadcrumbs will automatically appear in the header.

## Future Improvements

1. Add support for nested dynamic routes (e.g., `/student/[studentId]`)
2. Improve automatic title generation for dynamic segments
3. Add breadcrumb truncation for long paths
4. Implement breadcrumb accessibility features