"use client"
import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { DropdownItem } from "../models/dropdown-item"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Button } from "../../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"

export interface ComboboxProps<T> {
  items: DropdownItem<T>[];
  value?: T;
  setValue: (value: T) => void;
  label?: string;
}

export function Combobox<T>({items, label, value, setValue}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const onValueChage = (changedValue: T) => {
    if (value !== changedValue) {
      setValue(changedValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          role="combobox"
          aria-expanded={open}
          className="grid grid-cols-[max-content_1fr] gap-1 justify-start">
            {value ? items.find((x) => x.value === value)?.label : "Select value..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {
                items.map(x => (
                  <CommandItem
                    key={x.value?.toString()}
                    keywords={[x.label]}
                    onSelect={(_event) => {
                      onValueChage(x.value);
                    }}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === x.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {x.label}-{x.value?.toString()}
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}