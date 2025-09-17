"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as ReactTable
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  BookOpen, 
  CheckCircle, 
  ChevronDown,
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Columns,
  MoreHorizontal,
  Search,
  Upload
} from "lucide-react"
import { toast } from "sonner"

// Define the type for our grade data
interface GradeEntry {
  id: string
  studentName: string
  studentId: string
  assignment: string
  grade: string | number
  maxPoints: number
  status: "pending" | "submitted" | "graded"
  comments?: string
}

// Define the table meta type
interface GradeTableMeta {
  updateGrade: (id: string, value: string | number) => void
  updateComments: (id: string, value: string) => void
  saveGrade: (id: string) => void
  saveAllGrades: () => void
}

// Define columns for the table
export const columns: ColumnDef<GradeEntry, unknown>[] = [
  {
    accessorKey: "studentName",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "studentId",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student ID
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "assignment",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignment
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("assignment")}</div>,
  },
  {
    accessorKey: "grade",
    enableSorting: true,
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const grade = row.getValue("grade") as string | number
      const maxPoints = row.original.maxPoints
      const rowData = row.original
      
      // Get the update function from table meta
      const { updateGrade } = table.options.meta as GradeTableMeta
      
      return (
        <Input
          type="number"
          min="0"
          max={maxPoints}
          value={grade}
          onChange={(e) => updateGrade(rowData.id, e.target.value)}
          className="w-20 h-8 text-sm"
          placeholder="Enter grade"
        />
      )
    },
  },
  {
    accessorKey: "maxPoints",
    enableSorting: true,
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max Points
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("maxPoints")}</div>
    ),
  },
  {
    accessorKey: "status",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "pending" ? "destructive" : status === "submitted" ? "default" : "secondary"} className="text-xs">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row, table }) => {
      const grade = row.original
      
      // Get the save function from table meta
      const { saveGrade } = table.options.meta as GradeTableMeta

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={true}
              onCheckedChange={() => saveGrade(grade.id)}
            >
              Save Grade
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={() => {}}
            >
              Request Review
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// Enhanced columns with comments field
export const columnsWithComments: ColumnDef<GradeEntry, unknown>[] = [
  {
    accessorKey: "studentName",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "studentId",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student ID
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "status",
    enableSorting: true,
    sortingFn: "text",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "pending" ? "destructive" : status === "submitted" ? "default" : "secondary"} className="text-xs">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "grade",
    enableSorting: true,
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grade
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const grade = row.getValue("grade") as string | number
      const maxPoints = row.original.maxPoints
      const rowData = row.original
      
      // Get the update function from table meta
      const { updateGrade } = table.options.meta as GradeTableMeta
      
      return (
        <div className="flex items-center gap-1">
          <Input
            type="number"
            min="0"
            max={maxPoints}
            value={grade}
            onChange={(e) => updateGrade(rowData.id, e.target.value)}
            className="w-16 h-8 text-sm"
            placeholder="Grade"
          />
          <span className="text-muted-foreground text-sm">/</span>
          <span className="font-medium text-sm">{maxPoints}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
        >
          Comments
        </Button>
      )
    },
    cell: ({ row, table }) => {
      const comments = row.getValue("comments") as string || ""
      const rowData = row.original
      
      // Get the update function from table meta
      const { updateComments } = table.options.meta as GradeTableMeta
      
      return (
        <div className="flex items-center gap-2">
          <Textarea
            value={comments}
            onChange={(e) => updateComments(rowData.id, e.target.value)}
            placeholder="Comments"
            className="w-40 h-8 min-h-[32px] text-sm py-1 resize-none"
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    enableSorting: false,
    cell: ({ row, table }) => {
      const grade = row.original
      
      // Get the save function from table meta
      const { saveGrade } = table.options.meta as GradeTableMeta

      return (
        <Button size="sm" className="h-8 text-sm px-2" onClick={() => saveGrade(grade.id)}>Save</Button>
      )
    },
  },
]

interface GradeEntryTableProps {
  data?: GradeEntry[]
  includeComments?: boolean
  onDataChange?: (data: GradeEntry[]) => void
}

export function GradeEntryTable({ data = [], includeComments = false, onDataChange }: GradeEntryTableProps) {
  // Use columns with comments if includeComments is true, otherwise use regular columns
  const tableColumns = includeComments ? columnsWithComments : columns
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  })
  
  // Local state for grade data
  const [localData, setLocalData] = React.useState<GradeEntry[]>(() => [...data])
  
  // Ref to track the previous data
  const prevDataRef = React.useRef<GradeEntry[]>(data)
  
  // Update local data when prop data changes
  React.useEffect(() => {
    // Check if data has actually changed by comparing lengths and each item
    const hasChanged = data.length !== prevDataRef.current.length || 
      data.some((item, index) => {
        const prevItem = prevDataRef.current[index]
        return item.id !== prevItem.id || 
               item.studentName !== prevItem.studentName ||
               item.studentId !== prevItem.studentId ||
               item.assignment !== prevItem.assignment ||
               item.grade !== prevItem.grade ||
               item.maxPoints !== prevItem.maxPoints ||
               item.status !== prevItem.status ||
               item.comments !== prevItem.comments
      })
    
    if (hasChanged && data.length > 0) {
      setLocalData([...data])
      prevDataRef.current = data
    }
  }, [data])
  
  // Function to update grade for a student
  const updateGrade = (id: string, value: string | number) => {
    setLocalData(prev => prev.map(item => 
      item.id === id ? { ...item, grade: value } : item
    ))
  }
  
  // Function to update comments for a student
  const updateComments = (id: string, value: string) => {
    setLocalData(prev => prev.map(item => 
      item.id === id ? { ...item, comments: value } : item
    ))
  }
  
  // Function to save a grade
  const saveGrade = (id: string) => {
    const student = localData.find(item => item.id === id)
    if (student) {
      toast.success(`Grade saved for ${student.studentName}`)
      // Update status to "graded"
      const updatedData = localData.map(item => 
        item.id === id ? { ...item, status: "graded" as const } : item
      )
      
      setLocalData(updatedData)
      
      // Notify parent component of data change
      if (onDataChange) {
        onDataChange(updatedData)
      }
    }
  }
  
  // Function to save all grades
  const saveAllGrades = () => {
    toast.success("All grades saved successfully!")
    // Update all statuses to "graded"
    const updatedData = localData.map(item => ({
      ...item,
      status: "graded" as const
    }))
    
    setLocalData(updatedData)
    
    // Notify parent component of data change
    if (onDataChange) {
      onDataChange(updatedData)
    }
  }

  const table = useReactTable({
    data: localData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    meta: {
      updateGrade,
      updateComments,
      saveGrade,
      saveAllGrades
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={(table.getColumn("studentName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("studentName")?.setFilterValue(event.target.value)
            }
            className="pl-8 h-8 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 text-sm">
                <Columns className="mr-1 h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" && column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="h-8 text-sm">
            <Upload className="mr-1 h-4 w-4" />
            Import
          </Button>
          <Button onClick={saveAllGrades} className="h-8 text-sm">
            <CheckCircle className="mr-1 h-4 w-4" />
            Submit All
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-primary text-sm py-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}