"use client";

import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/utils/index";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

interface DateTimePickerProps {
    value?: Date | null;
    onChange: (date: Date | null | undefined) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function DateTimePicker({
    value,
    onChange,
    disabled = false,
    placeholder = "Pick a date and time",
}: DateTimePickerProps) {
    const [open, setOpen] = React.useState(false);

    // Initialize with current time
    const now = new Date();
    const currentHour12 = now.getHours() % 12 || 12;
    const currentMinute = now.getMinutes();
    const currentPeriod = now.getHours() >= 12 ? "PM" : "AM";

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        value ? value : undefined
    );
    const [hours, setHours] = React.useState<number>(
        value ? (value.getHours() % 12 || 12) : currentHour12
    );
    const [minutes, setMinutes] = React.useState<number>(
        value ? value.getMinutes() : currentMinute
    );
    const [period, setPeriod] = React.useState<"AM" | "PM">(
        value && value.getHours() >= 12 ? "PM" : currentPeriod
    );

    const hourScrollRef = React.useRef<HTMLDivElement>(null);
    const minuteScrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (value) {
            setSelectedDate(value);
            setHours(value.getHours() % 12 || 12);
            setMinutes(value.getMinutes());
            setPeriod(value.getHours() >= 12 ? "PM" : "AM");
        } else {
            setSelectedDate(undefined);
        }
    }, [value]);

    // Auto-scroll to selected hour and minute when popover opens
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                if (hourScrollRef.current) {
                    const selectedButton = hourScrollRef.current.querySelector(
                        `[data-value="${hours}"]`
                    );
                    if (selectedButton) {
                        selectedButton.scrollIntoView({ block: "center", behavior: "auto" });
                    }
                }
                if (minuteScrollRef.current) {
                    const selectedButton = minuteScrollRef.current.querySelector(
                        `[data-value="${minutes}"]`
                    );
                    if (selectedButton) {
                        selectedButton.scrollIntoView({ block: "center", behavior: "auto" });
                    }
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Handle scroll on change separately if needed, but the above covers open.
    // We can add another effect for when hours/minutes change while open if we want "smooth" scrolling then.


    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            const newDate = new Date(date);
            const hour24 =
                period === "PM" && hours !== 12
                    ? hours + 12
                    : hours === 12 && period === "AM"
                        ? 0
                        : hours;
            newDate.setHours(hour24, minutes, 0, 0);
            onChange(newDate);
        }
    };

    const handleTimeChange = (
        newHours?: number,
        newMinutes?: number,
        newPeriod?: "AM" | "PM"
    ) => {
        const h = newHours ?? hours;
        const m = newMinutes ?? minutes;
        const p = newPeriod ?? period;

        setHours(h);
        setMinutes(m);
        setPeriod(p);

        if (selectedDate) {
            const newDate = new Date(selectedDate);
            const hour24 =
                p === "PM" && h !== 12 ? h + 12 : h === 12 && p === "AM" ? 0 : h;
            newDate.setHours(hour24, m, 0, 0);
            onChange(newDate);
        }
    };

    const handleClear = () => {
        setSelectedDate(undefined);
        const now = new Date();
        setHours(now.getHours() % 12 || 12);
        setMinutes(now.getMinutes());
        setPeriod(now.getHours() >= 12 ? "PM" : "AM");
        onChange(undefined);
        setOpen(false);
    };

    const displayValue = selectedDate
        ? format(selectedDate, "MMM d, yyyy 'at' h:mm a")
        : "";

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="relative flex items-center">
                    <CalendarIcon
                        size={14}
                        className="absolute left-3 text-neutral-500 pointer-events-none"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        disabled={disabled}
                        className={cn(
                            "w-full justify-start pl-9 pr-10 text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        {displayValue || placeholder}
                    </Button>
                    {selectedDate && !disabled && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="absolute right-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                    />
                    <div className="flex flex-col justify-between p-4 sm:w-[200px]">
                        <div>
                            <p className="mb-3 text-sm font-medium">Time</p>
                            <div className="flex justify-center gap-1">
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        ref={hourScrollRef}
                                        className="h-48 w-14 overflow-y-scroll rounded-md border border-neutral-200 bg-white scrollbar-hide dark:border-neutral-800 dark:bg-neutral-950"
                                        onWheel={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                            <button
                                                key={hour}
                                                type="button"
                                                data-value={hour}
                                                onClick={() =>
                                                    handleTimeChange(hour, undefined, undefined)
                                                }
                                                disabled={disabled}
                                                className={cn(
                                                    "w-full px-2 py-2 text-center text-sm transition-colors",
                                                    hours === hour
                                                        ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                                                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                                )}
                                            >
                                                {hour.toString().padStart(2, "0")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        ref={minuteScrollRef}
                                        className="h-48 w-14 overflow-y-scroll rounded-md border border-neutral-200 bg-white scrollbar-hide dark:border-neutral-800 dark:bg-neutral-950"
                                        onWheel={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                                            <button
                                                key={minute}
                                                type="button"
                                                data-value={minute}
                                                onClick={() =>
                                                    handleTimeChange(undefined, minute, undefined)
                                                }
                                                disabled={disabled}
                                                className={cn(
                                                    "w-full px-2 py-2 text-center text-sm transition-colors",
                                                    minutes === minute
                                                        ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                                                        : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                                )}
                                            >
                                                {minute.toString().padStart(2, "0")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* AM/PM Selector */}
                                <div className="flex flex-col gap-2 h-48 justify-start">
                                    <div className="flex flex-col rounded-md border border-neutral-200 dark:border-neutral-800">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleTimeChange(undefined, undefined, "AM")
                                            }
                                            disabled={disabled}
                                            className={cn(
                                                "px-3 py-2 text-sm font-medium transition-colors",
                                                period === "AM"
                                                    ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                                                    : "bg-white text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-300"
                                            )}
                                        >
                                            AM
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleTimeChange(undefined, undefined, "PM")
                                            }
                                            disabled={disabled}
                                            className={cn(
                                                "px-3 py-2 text-sm font-medium transition-colors",
                                                period === "PM"
                                                    ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                                                    : "bg-white text-neutral-700 hover:bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-300"
                                            )}
                                        >
                                            PM
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleClear}
                                disabled={disabled}
                                className="w-full"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
