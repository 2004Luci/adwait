"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, addDays, startOfDay } from "date-fns";
import {
  X,
  Clock,
  Mail,
  Calendar as CalendarIcon,
  Check,
  User,
  Phone,
  Globe,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "./ui/utils";
import {
  PersonalDetails,
  ScheduleDetails,
  personalDetailsSchema,
  scheduleDetailsSchema,
} from "@/lib/schema";
import { formatRemainingTime } from "@/lib/utils";
import { timeSlots } from "@/lib/constants";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getCountryCode(phoneNumber: string): number {
  const phone = parsePhoneNumber(phoneNumber);
  return Number(phone?.countryCallingCode) ?? 91;
}

export function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<ScheduleDetails["date"] | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<ScheduleDetails["time"]>("");
  const [name, setName] = useState<PersonalDetails["name"]>("");
  const [phone, setPhone] = useState<PersonalDetails["phone"]>("");
  const [email, setEmail] = useState<PersonalDetails["email"]>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<PersonalDetails>>({});

  // Disable current day, next 2 days, and weekends
  const disabledDays = [
    { before: addDays(startOfDay(new Date()), 4) }, // Disable current day and next 3 days (current + 3 = 4)
    { dayOfWeek: [0, 6] }, // Disable weekends (Sunday = 0, Saturday = 6)
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsDatePopoverOpen(false);
    setSelectedTime(""); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    const personalDetails = { name, phone, email };
    const result = personalDetailsSchema.safeParse(personalDetails);

    if (result.success) {
      setErrors({});
      setStep(2);
    } else {
      const newErrors: Partial<PersonalDetails> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof PersonalDetails] = issue.message;
        }
      });
      setErrors(newErrors);
      const errorCount = Object.keys(newErrors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? "s" : ""} in the form`, {
        description: "Please review the highlighted fields and correct the errors.",
        duration: 4000,
      });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleScheduleSubmit = async () => {
    const scheduleDetails = {
      date: selectedDate,
      time: selectedTime,
    };

    const scheduleResult = scheduleDetailsSchema.safeParse(scheduleDetails);

    if (!scheduleResult.success) {
      toast.error("Please select a date and time", {
        description: "Please choose both a consultation date and time to proceed.",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/schedule-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate!.toISOString(),
          time: selectedTime,
          email: email,
          name: name,
          phone: phone,
        }),
      });

      if (response.ok) {
        toast.success("Consultation scheduled successfully!", {
          description: `Thank you ${name}! We've sent a confirmation email to ${email}. Please check your inbox and spam folder.`,
          duration: 5000,
        });
        onClose();
        setStep(1);
        setSelectedDate(undefined);
        setSelectedTime("");
        setName("");
        setPhone("");
        setEmail("");
        setErrors({});
      } else {
        const error = await response.json();
        if (response.status === 429) {
          const remainingTime = error.remainingTime || 300;
          const formattedTime = formatRemainingTime(remainingTime);
          toast.error("Too many scheduling attempts", {
            description: error.message ?? `Please try again in ${formattedTime}.`,
            duration: 6000,
          });
        } else {
          toast.error("Failed to schedule consultation", {
            description:
              error.message ||
              "Please check your internet connection and try again. If the problem persists, please contact us directly.",
            duration: 6000,
          });
        }
      }
    } catch (err) {
      console.error("Error scheduling consultation:", err);
      toast.error("Failed to schedule consultation", {
        description:
          "Please check your internet connection and try again. If the problem persists, please contact us directly.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate(undefined);
    setSelectedTime("");
    setName("");
    setPhone("");
    setEmail("");
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-sage-900 border border-sage-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sage-800 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-sage-200" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-sage-50">Schedule Consultation</h2>
                  <p className="text-sm text-sage-300">
                    {step === 1 ? "Step 1: Personal Information" : "Step 2: Schedule Details"}
                  </p>
                </div>
              </div>
              <button
                onClick={resetForm}
                className="cursor-pointer p-2 hover:bg-sage-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-sage-300" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= 1
                      ? "bg-sage-600 border-sage-400 text-sage-50"
                      : "bg-sage-800 border-sage-600 text-sage-400"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? "bg-sage-600" : "bg-sage-700"}`} />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= 2
                      ? "bg-sage-600 border-sage-400 text-sage-50"
                      : "bg-sage-800 border-sage-600 text-sage-400"
                  }`}
                >
                  <CalendarIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-sage-100 mb-4">Personal Information</h3>

                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name" className="text-sage-200 mb-2 block">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`pl-10 bg-sage-800 border-sage-700 text-sage-100 placeholder:text-sage-400 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone" className="text-sage-200 mb-2 block">
                      Contact Number *
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-400 z-10" />
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="IN"
                        value={phone}
                        onChange={(value) => {
                          setPhone(value || "");
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className={`PhoneInput ${errors.phone ? "error" : ""}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    <p className="text-xs text-sage-400 mt-2">
                      We&apos;ll call you at this number for the consultation
                    </p>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="text-sage-200 mb-2 block">
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sage-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`pl-10 bg-sage-800 border-sage-700 text-sage-100 placeholder:text-sage-400 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    <p className="text-xs text-sage-400 mt-2">
                      We&apos;ll send confirmation details to this email address
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-sage-100 mb-4">Schedule Details</h3>

                  {/* Date Selection */}
                  <div>
                    <Label className="text-sage-200 mb-3 block">Select Date *</Label>
                    <Popover
                      open={isDatePopoverOpen}
                      onOpenChange={(open) => setIsDatePopoverOpen(open)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!selectedDate}
                          className={cn(
                            "w-full justify-start text-left font-normal bg-sage-800 border-sage-700 text-sage-300 hover:bg-sage-700 hover:border-sage-600 hover:text-white cursor-pointer",
                            !selectedDate && "text-sage-400"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            format(selectedDate, "EEEE, MMMM do, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-sage-800 border-sage-700"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={disabledDays}
                          autoFocus
                          className="bg-sage-800"
                          classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            month: "space-y-4 w-full",
                            caption: "flex justify-between items-center h-12 mb-4",
                            caption_label: "text-lg font-semibold text-sage-200",
                            nav: "flex items-center space-x-2",
                            nav_button:
                              "h-9 w-9 bg-sage-700 hover:bg-sage-600 p-0 rounded-lg transition-all duration-200 flex items-center justify-center border border-sage-600 hover:border-sage-500 text-sage-300",
                            nav_button_previous: "",
                            nav_button_next: "",
                            table: "w-full border-collapse",
                            head_row: "flex mb-3",
                            head_cell:
                              "text-sage-400 rounded-md w-10 font-medium text-[0.8rem] uppercase tracking-wider text-center",
                            row: "flex w-full mb-1",
                            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                            day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-sage-700 hover:text-sage-100 rounded-lg transition-all duration-200 focus:bg-sage-700 focus:text-sage-100 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 focus:ring-offset-sage-800 relative bg-transparent border-none text-sage-200",
                            day_selected:
                              "bg-gradient-to-r from-sage-600 to-sage-500 text-sage-50 hover:from-sage-500 hover:to-sage-400 focus:from-sage-500 focus:to-sage-400 shadow-lg border-2 border-sage-400 font-semibold ring-2 ring-sage-300 ring-offset-2 ring-offset-sage-800",
                            day_today:
                              "bg-sage-700/50 text-sage-200 font-semibold ring-2 ring-sage-500",
                            day_outside:
                              "text-sage-500 opacity-30 hover:bg-sage-700/30 hover:text-sage-300",
                            day_disabled:
                              "text-sage-500 opacity-20 cursor-not-allowed hover:bg-transparent hover:text-sage-500 line-through bg-sage-800/30 border border-sage-600/30",
                            day_range_middle:
                              "aria-selected:bg-sage-700 aria-selected:text-sage-200",
                            day_hidden: "invisible",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <Label className="text-sage-200 mb-3 block">Select Time *</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`cursor-pointer p-3 rounded-lg text-sm font-medium transition-all ${
                              selectedTime === time
                                ? "bg-sage-600 text-sage-50 border-2 border-sage-400"
                                : "bg-sage-800 text-sage-200 border border-sage-700 hover:bg-sage-700 hover:border-sage-600"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {selectedDate && selectedTime && (
                    <div className="bg-sage-800/50 border border-sage-700 rounded-lg p-4">
                      <h3 className="text-sage-200 font-medium mb-2">Consultation Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-sage-400" />
                          <span className="text-sage-300">Name: {name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-sage-400" />
                          <span className="text-sage-300">Phone: {phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-sage-400" />
                          <span className="text-sage-300">Email: {email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-sage-400" />
                          <span className="text-sage-300">
                            Date: {format(selectedDate, "EEEE, MMMM do, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sage-400" />
                          <span className="text-sage-300">
                            Time: {selectedTime} {getCountryCode(phone) != 91 ? "IST" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              {step === 1 ? (
                <>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="cursor-pointer flex-1 border-sage-700 text-sage-300 hover:bg-sage-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!name.trim() || !phone.trim() || !email.trim()}
                    className="cursor-pointer flex-1 bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 hover:from-sage-300 hover:to-sage-400 disabled:opacity-50"
                  >
                    <div className="flex items-center gap-2">
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="cursor-pointer flex-1 border-sage-700 text-sage-300 hover:bg-sage-800 hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </div>
                  </Button>
                  <Button
                    onClick={handleScheduleSubmit}
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="cursor-pointer flex-1 bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 hover:from-sage-300 hover:to-sage-400 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-sage-900 border-t-transparent rounded-full animate-spin" />
                        Scheduling...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Confirm Booking
                      </div>
                    )}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
