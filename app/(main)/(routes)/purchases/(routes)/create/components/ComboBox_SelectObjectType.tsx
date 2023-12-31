"use client"

import * as React from "react"
import {
  CheckCircle2,
  HelpCircle,
  LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
  icon: LucideIcon
}

const statuses: Status[] = [
  {
    value: "FIXED",
    label: "Fixed",
    icon: CheckCircle2,
  },
  {
    value: "VARIANT",
    label: "Variant",
    icon: HelpCircle,
  },
]

interface ComboBox_SelectObjectTypeProps {
  setObjectType: any
}

export function ComboBox_SelectObjectType(props: ComboBox_SelectObjectTypeProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  function selectValue(value: Status) {
    setSelectedStatus(value)
    props.setObjectType(value.value)
    setOpen(false)
  }

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Object type:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>{selectedStatus ? selectedStatus : '...'}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Type object name..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={() => selectValue(status)}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
