// Utility functions for route validation and parameter handling

export function validateId(id: string): boolean {
  // Basic validation for ID parameters
  return typeof id === 'string' && id.length > 0 && id.length < 50;
}

export function validateClassId(classId: string): boolean {
  // Validation specific to class IDs
  return validateId(classId);
}

export function validateStudentId(studentId: string): boolean {
  // Validation specific to student IDs
  return validateId(studentId);
}

export function validateTeacherId(teacherId: string): boolean {
  // Validation specific to teacher IDs
  return validateId(teacherId);
}

export function sanitizeSearchQuery(query: string): string {
  // Sanitize search queries to prevent injection
  return query.replace(/[^a-zA-Z0-9\s\-_]/g, '');
}

export function buildRedirectUrl(role: string, path: string = ''): string {
  // Build redirect URLs based on user role
  const basePath = `/${role}`;
  return path ? `${basePath}${path}` : basePath;
}

// Type definitions for route parameters
export interface RouteParams {
  classId?: string;
  studentId?: string;
  teacherId?: string;
  [key: string]: string | undefined;
}

export interface SearchParams {
  q?: string;
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
}

// Example of how to use these utilities in a page component
/*
export default function ClassDetailPage({
  params,
  searchParams
}: {
  params: RouteParams;
  searchParams: SearchParams;
}) {
  // Validate parameters
  if (!validateClassId(params.classId || '')) {
    notFound();
  }

  // Sanitize search parameters
  const query = sanitizeSearchQuery(searchParams.q || '');

  // ... rest of component implementation
}
*/