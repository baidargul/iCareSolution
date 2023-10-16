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
import ToolTipProvider from "../ToolTip/ToolTipProvider"

type Status = {
  value: string
  label: string
  icon?: LucideIcon
}

let statuses: Status[] = [
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

type Sides = "top" | "bottom" | "left" | "right"

interface ComboBoxProps {
  title: string
  prompt: string
  setValue: any
  disabled?: boolean
  options?: any
  side?: Sides
}

export function ComboBoxSelect(props: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )
  function selectValue(value: Status) {
    setSelectedStatus(value)
    props.setValue(value.value)
    setOpen(false)
  }

  if (props.options) statuses = props.options

  return (
    <ToolTipProvider value={selectedStatus?.value ? selectedStatus.value : props.prompt}>
      <div className="flex items-center space-x-4">
        <p className="text-sm text-muted-foreground">{props.title ? props.title : 'Object type:'}</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={props.disabled}
              variant="outline"
              size="sm"
              className="w-[150px] justify-start overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {selectedStatus ? (
                <>
                  {selectedStatus.icon && <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />}
                  {selectedStatus.label}
                </>
              ) : (
                <>{selectedStatus ? selectedStatus : '...'}</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side={props.side ? props.side : "bottom"} align="start">
            <Command>
              <CommandInput placeholder={props.prompt ? props.prompt : "Search here..."} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.value}
                      onSelect={() => selectValue(status)}
                    >
                      {status.icon && <status.icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          status.value === selectedStatus?.value
                            ? "opacity-100"
                            : "opacity-40"
                        )}
                      />}
                      <span>{status.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </ToolTipProvider>
  )
}
