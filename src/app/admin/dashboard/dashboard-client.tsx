"use client"

import { useState } from "react"
import { ServiceRequest } from "@prisma/client"
import { CheckCircle, Clock, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { updateRequestStatus } from "../actions"

type RequestWithDetails = ServiceRequest

interface DashboardClientProps {
    initialRequests: RequestWithDetails[]
}

export function DashboardClient({ initialRequests }: DashboardClientProps) {
    const [requests, setRequests] = useState(initialRequests)
    const [filterStatus, setFilterStatus] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredRequests = initialRequests.filter((req) => {
        const matchesStatus = filterStatus === "all" || req.status === filterStatus
        const matchesSearch =
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.includes(searchTerm)
        return matchesStatus && matchesSearch
    })

    const handleStatusChange = async (id: string, newStatus: string) => {
        // Optimistic update
        // setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r))
        await updateRequestStatus(id, newStatus)
        // Server action revalidates path, router refresh might be needed implicitly or explicitly
        // Since we pass initialRequests from server, we rely on standard refresh or just router.refresh() if needed
        // But revalidatePath works on next fetch. Component props don't update automatically without router.refresh()
        // For simplicity, we just use the result or assume page reload on action. 
        // Actually, to make it snappy, client state update is good.
        // However, initialRequests prop won't change unless page reloads.
        location.reload() // Simplest for MVP admin
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-800"
            case "in_progress": return "bg-yellow-100 text-yellow-800"
            case "completed": return "bg-green-100 text-green-800"
            case "closed": return "bg-gray-100 text-gray-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Service Requests</h1>
                <div className="flex gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Search name, email, ID..."
                        className="md:w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                            <tr>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Appliance / Issue</th>
                                <th className="px-6 py-4 font-medium">Urgency</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((req) => (
                                <tr key={req.id} className="bg-background border-b hover:bg-muted/30">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex flex-col">
                                            <span className="text-base">{req.name}</span>
                                            <span className="text-xs text-muted-foreground">{req.email || req.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{req.applianceType}</span>
                                            <span className="text-xs text-muted-foreground truncate max-w-[200px]">{req.issueType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${req.urgency === 'Today' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {req.urgency}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={req.status}
                                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                                            className={`text-xs font-semibold px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${getStatusColor(req.status)}`}
                                        >
                                            <option value="new">New</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">View</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[500px]">
                                                <DialogHeader>
                                                    <DialogTitle>Request Details</DialogTitle>
                                                    <DialogDescription>ID: {req.id}</DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
                                                            <p>{req.name}</p>
                                                            <p className="text-sm">{req.phone}</p>
                                                            <p className="text-sm">{req.email}</p>
                                                            <p className="text-sm mt-1">{req.address}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Service</h4>
                                                            <p className="font-semibold">{req.applianceType}</p>
                                                            <p className="text-sm">{req.issueType}</p>
                                                            <p className="text-sm badge badge-outline mt-1 inline-block">{req.urgency}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                                                        <p className="text-sm bg-muted p-3 rounded-md">{req.description}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Method</h4>
                                                        <p className="text-sm">{req.preferredContact}</p>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredRequests.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No requests found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
