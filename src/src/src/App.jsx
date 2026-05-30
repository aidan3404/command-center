import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Dumbbell,
  BookOpen,
  Brain,
  Languages,
  Flag,
  MessageCircle,
  Plus,
  Trash2,
  TrendingUp,
  CalendarDays,
  UserRound,
  Phone,
  Mail,
  Flame,
  Search,
  Wallet,
  Utensils,
  Beef,
  Scale,
  Wand2,
  Droplets,
  Quote,
  PenLine,
  Star,
  Users,
  Building2,
  Briefcase,
  NotebookPen,
  Sun,
  Moon,
  Download,
  FileText,
  ClipboardList,
  Plane,
  Upload,
  HeartHandshake,
  CheckSquare,
  Award,
  Shuffle,
  Swords,
  RotateCcw,
  BarChart3,
  Eye,
  CloudSun,
  MapPin,
  PartyPopper,
  RefreshCcw,
} from "lucide-react";

const Card = ({ className = "", children }) => <div className={className}>{children}</div>;
const CardContent = ({ className = "", children }) => <div className={className}>{children}</div>;
const Button = ({ className = "", children, ...props }) => <button className={className} {...props}>{children}</button>;

const todayKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / 86400000);
};

const defaultHabits = [
  { id: "bible", name: "Bible", icon: "BookOpen", category: "Faith" },
  { id: "chess", name: "Chess", icon: "Brain", category: "Mind" },
  { id: "italian", name: "Italian", icon: "Languages", category: "Skill" },
  { id: "golf", name: "Golf", icon: "Flag", category: "Lifestyle" },
  { id: "fitness", name: "Gym / Cardio", icon: "Dumbbell", category: "Body" },
  { id: "relationships", name: "Key Relationship Touch", icon: "Users", category: "Network" },
];

const defaultGoals = [
  { id: "jet-card", title: "Sell a Jet Card", current: 0, target: 1, unit: "sale", type: "up" },
  { id: "body-fat", title: "Reach 15% Body Fat", current: 25, target: 15, unit: "%", type: "down" },
  { id: "credit", title: "Grow Credit Score", current: 0, target: 50, unit: "points", type: "up" },
  { id: "brand", title: "Build Jet Card Insider", current: 0, target: 100, unit: "posts/touches", type: "up" },
];

const defaultPeople = [
  { id: 1, name: "Business Mentor", company: "Personal Network", role: "Mentor", category: "Mentor", phone: "", email: "", notes: "Someone strong in business and life. Keep this relationship warm.", lastTouch: "" },
  { id: 2, name: "Private Aviation Contact", company: "JetSet / Aviation", role: "Industry Contact", category: "Aviation", phone: "", email: "", notes: "Useful for jet card relationships, operators, clients, and referrals.", lastTouch: "" },
  { id: 3, name: "High-Value Prospect", company: "Florida / NY / NJ", role: "Potential Client", category: "Prospect", phone: "", email: "", notes: "Track context, family, travel habits, and next conversation angle.", lastTouch: "" },
];

const defaultAssets = [
  { id: 1, name: "Cash", value: 2500 },
  { id: 2, name: "Checking", value: 0 },
  { id: 3, name: "Savings", value: 0 },
  { id: 4, name: "Investments", value: 0 },
  { id: 5, name: "Car / Personal Assets", value: 0 },
];

const defaultCalendarEvents = [
  { id: 1, time: "9:00 AM", title: "Morning routine", location: "Personal" },
  { id: 2, time: "12:30 PM", title: "Follow up with key person", location: "Business" },
  { id: 3, time: "6:00 PM", title: "Gym / cardio", location: "Health" },
];

const weatherCodeLabel = (code) => {
  const labels = {
    0: "Clear", 1: "Mostly clear", 2: "Partly cloudy", 3: "Cloudy", 45: "Fog", 48: "Fog",
    51: "Drizzle", 53: "Drizzle", 55: "Drizzle", 61: "Rain", 63: "Rain", 65: "Heavy rain",
    71: "Snow", 73: "Snow", 75: "Heavy snow", 80: "Showers", 81: "Showers", 82: "Heavy showers",
    95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
  };
  return labels[code] || "Weather";
};


const morningRoutine = ["Make bed", "Bible", "Pray", "Affirmations", "Push-ups", "Brush teeth", "Sunlight"];
const nightRoutine = ["Shower", "Bible", "Read book", "Pray", "Affirmations", "No phone wind-down"];

const affirmationBank = [
  "I am calm, focused, and in control of my actions.",
  "I keep promises to myself and build confidence through discipline.",
  "I am becoming stronger in faith, body, mind, and business.",
  "I do not need to feel perfect to take action today.",
  "I move with confidence, humility, and purpose.",
  "I am the kind of man who follows through.",
  "I handle pressure with calm and clear thinking.",
  "I choose discipline over comfort.",
  "I am building a life I am proud of one day at a time.",
  "I speak clearly, listen well, and build strong relationships.",
  "I am prepared for bigger opportunities because I respect the small details.",
  "I am healthy, capable, and getting better every day.",
  "I trust God’s timing while doing my part with excellence.",
  "I am not controlled by fear. I act with faith and courage.",
  "I am becoming a trusted, valuable man in every room I enter.",
  "I control my inputs, my habits, and my response.",
  "I am consistent even when motivation is low.",
  "I lead myself before I try to lead anything else.",
  "I am grateful, grounded, and focused on what matters.",
  "I am building wealth, wisdom, health, and character.",
  "I bring value before I ask for value.",
  "I do hard things because my future is worth it.",
  "I stay sharp, honest, and reliable.",
  "I use my time with intention.",
  "I am not behind. I am building.",
  "I show up as the person my goals require.",
  "I am disciplined with food, money, words, and time.",
  "I create momentum through small wins.",
  "I am confident because I am prepared.",
  "I will make today count."
];

const weeklyReviewPrompts = [
  "What went well this week?",
  "What did I avoid or procrastinate on?",
  "What did I learn?",
  "Who did I build or maintain a relationship with?",
  "What habit needs more attention next week?",
  "What is my main focus for next week?"
];

const getActionXp = (task = {}) => {
  const title = String(task.title || "").toLowerCase();
  const category = String(task.category || "").toLowerCase();
  if (title.includes("25") || title.includes("10 minutes") || title.includes("vacuum") || title.includes("study") || title.includes("sales script") || title.includes("clean your room")) return 50;
  if (title.includes("5-minute") || title.includes("walk") || title.includes("journal") || title.includes("bible") || title.includes("pray") || title.includes("protein") || category.includes("business")) return 35;
  if (category.includes("body") || category.includes("faith") || category.includes("relationships") || category.includes("money")) return 30;
  if (category.includes("environment") || category.includes("digital") || category.includes("planning")) return 25;
  return 20;
};

const defaultActionTasks = [
  { id: "clean-room", title: "Clean your room for 10 minutes", category: "Environment" },
  { id: "make-bed-reset", title: "Reset your bed and floor", category: "Environment" },
  { id: "clear-desk", title: "Clear your desk", category: "Environment" },
  { id: "laundry", title: "Start or fold laundry", category: "Environment" },
  { id: "trash", title: "Take out trash / clean one surface", category: "Environment" },
  { id: "pushups", title: "Do 25 push-ups", category: "Body" },
  { id: "walk", title: "Take a 10-minute walk outside", category: "Body" },
  { id: "water", title: "Drink 16 oz of water", category: "Body" },
  { id: "stretch", title: "Stretch hips, back, and shoulders", category: "Body" },
  { id: "protein", title: "Eat a clean high-protein meal", category: "Body" },
  { id: "bible", title: "Read one chapter of the Bible", category: "Faith" },
  { id: "pray", title: "Pray for 5 focused minutes", category: "Faith" },
  { id: "affirmations", title: "Say affirmations", category: "Mind" },
  { id: "journal", title: "Write a journal entry", category: "Mind" },
  { id: "read", title: "Read 10 pages", category: "Mind" },
  { id: "italian", title: "Do 10 minutes of Italian", category: "Skill" },
  { id: "chess", title: "Play a chess match", category: "Skill" },
  { id: "chess-puzzles", title: "Do 3 chess puzzles", category: "Skill" },
  { id: "golf", title: "Practice putting or grip for 10 minutes", category: "Skill" },
  { id: "key-person", title: "Text one key person just to stay warm", category: "Relationships" },
  { id: "mentor", title: "Send a thoughtful question to a mentor", category: "Relationships" },
  { id: "old-contact", title: "Restart one old conversation", category: "Relationships" },
  { id: "charter-note", title: "Review one jet charter script", category: "Business" },
  { id: "prospect-list", title: "Add one person to your People list", category: "Business" },
  { id: "learn-aviation", title: "Study one aviation term or aircraft category", category: "Business" },
  { id: "money", title: "Update your money/assets tracker", category: "Money" },
  { id: "review-week", title: "Write one lesson from this week", category: "Review" },
  { id: "wipe-mirror", title: "Wipe your bathroom mirror", category: "Environment" },
  { id: "clear-counter", title: "Clear one counter", category: "Environment" },
  { id: "vacuum-room", title: "Vacuum your room", category: "Environment" },
  { id: "organize-drawer", title: "Organize one drawer", category: "Environment" },
  { id: "hang-clothes", title: "Hang up clothes in your closet", category: "Environment" },
  { id: "organize-shoes", title: "Organize your shoes", category: "Environment" },
  { id: "wash-dishes", title: "Wash dishes or load the dishwasher", category: "Environment" },
  { id: "clear-nightstand", title: "Clear your nightstand", category: "Environment" },
  { id: "car-trash", title: "Take trash out of your car", category: "Environment" },
  { id: "clean-phone", title: "Clean your phone screen", category: "Environment" },
  { id: "wipe-desk", title: "Wipe your desk", category: "Environment" },
  { id: "pick-five-floor", title: "Pick up five things from the floor", category: "Environment" },
  { id: "fold-five-clothes", title: "Fold five pieces of clothing", category: "Environment" },
  { id: "put-away-laundry", title: "Put away five pieces of laundry", category: "Environment" },
  { id: "clear-chair", title: "Clear the chair with clothes on it", category: "Environment" },
  { id: "wipe-sink", title: "Wipe the bathroom sink", category: "Environment" },
  { id: "set-timer-clean", title: "Set a 5-minute timer and clean", category: "Environment" },
  { id: "one-song-clean", title: "Clean for one song", category: "Environment" },
  { id: "put-one-thing-away", title: "Put one thing back where it belongs", category: "Environment" },
  { id: "situps", title: "Do 25 sit-ups", category: "Body" },
  { id: "squats", title: "Do 25 bodyweight squats", category: "Body" },
  { id: "plank", title: "Hold a plank", category: "Body" },
  { id: "slow-breaths", title: "Do 10 slow breaths", category: "Body" },
  { id: "posture", title: "Fix your posture for 2 minutes", category: "Body" },
  { id: "wash-face", title: "Wash your face", category: "Body" },
  { id: "brush-floss", title: "Brush and floss", category: "Body" },
  { id: "calf-raises", title: "Do 30 calf raises", category: "Body" },
  { id: "wall-sit", title: "Do a wall sit", category: "Body" },
  { id: "shoulder-rolls", title: "Do 20 shoulder rolls", category: "Body" },
  { id: "walk-house", title: "Walk around the house for 3 minutes", category: "Body" },
  { id: "stretch-neck", title: "Stretch your neck and traps", category: "Body" },
  { id: "fill-water", title: "Fill your water bottle", category: "Food" },
  { id: "plan-protein", title: "Plan your next protein meal", category: "Food" },
  { id: "prep-simple-meal", title: "Prep one simple meal", category: "Food" },
  { id: "log-last-meal", title: "Log your last meal", category: "Food" },
  { id: "check-calories", title: "Check calories left", category: "Food" },
  { id: "protein-shake", title: "Make a protein shake if needed", category: "Food" },
  { id: "delete-emails", title: "Delete or archive 10 emails", category: "Digital" },
  { id: "delete-photos", title: "Delete 20 useless photos", category: "Digital" },
  { id: "close-tabs", title: "Close 5 browser tabs", category: "Digital" },
  { id: "clear-notifications", title: "Clear old notifications", category: "Digital" },
  { id: "move-app", title: "Move one distracting app off your home screen", category: "Digital" },
  { id: "reply-text", title: "Reply to one text you have been ignoring", category: "Digital" },
  { id: "read-proverb", title: "Read one Proverb", category: "Faith" },
  { id: "read-psalm", title: "Read one Psalm", category: "Faith" },
  { id: "pray-family", title: "Pray for your family", category: "Faith" },
  { id: "pray-future", title: "Pray over your future", category: "Faith" },
  { id: "write-prayer", title: "Write a short prayer", category: "Faith" },
  { id: "bible-takeaway", title: "Write one Bible takeaway", category: "Faith" },
  { id: "quiet-minute", title: "Sit quietly for one minute", category: "Mind" },
  { id: "brain-dump", title: "Brain dump everything on your mind", category: "Mind" },
  { id: "one-lesson", title: "Write one lesson from today", category: "Mind" },
  { id: "read-one-page", title: "Read one page", category: "Mind" },
  { id: "read-ten-pages", title: "Read 10 pages", category: "Mind" },
  { id: "review-goals", title: "Read your goals", category: "Mind" },
  { id: "write-one-idea", title: "Write one idea you do not want to forget", category: "Mind" },
  { id: "practice-intro", title: "Practice introducing yourself", category: "Communication" },
  { id: "voice-note", title: "Record a 30-second voice note practicing a message", category: "Communication" },
  { id: "better-question", title: "Write one better question to ask someone", category: "Communication" },
  { id: "mirror-talk", title: "Talk clearly in the mirror for 30 seconds", category: "Communication" },
  { id: "check-friend", title: "Check in on one friend", category: "Relationships" },
  { id: "family-text", title: "Text a family member", category: "Relationships" },
  { id: "send-compliment", title: "Send one genuine compliment", category: "Relationships" },
  { id: "people-note", title: "Update notes for one person", category: "Relationships" },
  { id: "linkedin-like", title: "Like or comment on one LinkedIn post", category: "Business" },
  { id: "review-charter-term", title: "Review one charter term", category: "Business" },
  { id: "practice-sales-script", title: "Practice one sales script", category: "Business" },
  { id: "aircraft-study", title: "Study one aircraft for 5 minutes", category: "Business" },
  { id: "add-key-note", title: "Add one note to a key person", category: "Business" },
  { id: "check-bank", title: "Check your bank account", category: "Money" },
  { id: "money-goal", title: "Write one money goal", category: "Money" },
  { id: "update-assets", title: "Update one asset number", category: "Money" },
  { id: "tomorrow-calendar", title: "Check tomorrow’s calendar", category: "Planning" },
  { id: "set-alarm", title: "Set or check tomorrow’s alarm", category: "Planning" },
  { id: "set-gym-clothes", title: "Set out gym clothes", category: "Planning" },
  { id: "quick-shower", title: "Take a quick shower reset", category: "Reset" },
  { id: "fresh-shirt", title: "Put on a fresh shirt", category: "Reset" },
  { id: "open-window", title: "Open a window or get fresh air", category: "Reset" },
  { id: "lights-reset", title: "Fix the lighting in your room", category: "Reset" },
  { id: "one-minute-win", title: "Do one thing that takes less than one minute", category: "Reset" },
  { id: "play-chess-match", title: "Play a chess match", category: "Skill" },
  { id: "say-affirmations-clean", title: "Say affirmations", category: "Mind" },
  { id: "read-10-pages-clean", title: "Read 10 pages", category: "Mind" },
  { id: "practice-putting-20", title: "Practice 20 putting strokes", category: "Skill" },
  { id: "golf-grip-2", title: "Work on golf grip for 2 minutes", category: "Skill" },
  { id: "learn-italian-5", title: "Learn 5 Italian words", category: "Skill" },
  { id: "duolingo-style", title: "Do one Italian lesson", category: "Skill" },
  { id: "shadow-box", title: "Shadow box for one minute", category: "Body" },
  { id: "jumping-jacks", title: "Do 30 jumping jacks", category: "Body" },
  { id: "mountain-climbers", title: "Do 20 mountain climbers", category: "Body" },
  { id: "air-squats-10", title: "Do 10 slow air squats", category: "Body" },
  { id: "pushups-10", title: "Do 10 clean push-ups", category: "Body" },
  { id: "situps-10", title: "Do 10 sit-ups", category: "Body" },
  { id: "calm-breathing", title: "Take 5 deep breaths", category: "Reset" },
  { id: "cold-water-face", title: "Splash cold water on your face", category: "Reset" },
  { id: "fresh-shirt-reset", title: "Change into a clean shirt", category: "Reset" },
  { id: "one-song-room", title: "Clean your room for one song", category: "Environment" },
  { id: "make-floor-visible", title: "Pick up five things from the floor", category: "Environment" },
  { id: "trash-bag-small", title: "Fill a small trash bag", category: "Environment" },
  { id: "organize-wallet", title: "Organize your wallet", category: "Environment" },
  { id: "organize-charger", title: "Organize your charger or cable", category: "Environment" },
  { id: "wash-one-cup", title: "Wash one cup or bottle", category: "Environment" },
  { id: "clear-sink", title: "Get the sink to zero dishes", category: "Environment" },
  { id: "clear-desk-zero", title: "Get your desk to zero clutter", category: "Environment" },
  { id: "delete-one-app", title: "Delete one app you do not need", category: "Digital" },
  { id: "screen-time-check", title: "Check your screen time", category: "Digital" },
  { id: "focus-mode", title: "Turn on Focus mode", category: "Digital" },
  { id: "organize-home-screen", title: "Move one distracting app off your home screen", category: "Digital" },
  { id: "write-message-draft", title: "Draft one message without sending it", category: "Communication" },
  { id: "practice-tone", title: "Practice saying one sentence with confidence", category: "Communication" },
  { id: "convo-bank-line", title: "Review one line from the Conversation Bank", category: "Communication" },
  { id: "send-check-in", title: "Send a simple check-in text", category: "Relationships" },
  { id: "pray-one-person", title: "Pray for one specific person", category: "Faith" },
  { id: "read-verse-card", title: "Read the verse card", category: "Faith" },
  { id: "write-faith-note", title: "Write one faith note", category: "Faith" },
  { id: "ask-wisdom", title: "Ask God for wisdom", category: "Faith" },
  { id: "charter-checklist", title: "Read the trip quoting checklist", category: "Business" },
  { id: "airport-code", title: "Learn one airport code", category: "Business" },
  { id: "client-question", title: "Write one better client question", category: "Business" },
  { id: "sales-line", title: "Write one better sales line", category: "Business" },
  { id: "review-aircraft", title: "Review one aircraft category", category: "Business" },
  { id: "healthy-snack", title: "Choose a clean snack", category: "Food" },
  { id: "pause-snack", title: "Pause before snacking and drink water first", category: "Food" },
  { id: "plan-breakfast", title: "Plan tomorrow’s breakfast", category: "Food" },
  { id: "write-money-goal", title: "Write one money goal", category: "Money" },
  { id: "subscription-check", title: "Think of one subscription you may not need", category: "Money" },
  { id: "review-money-tab", title: "Review your money tab", category: "Money" },
  { id: "weekly-one-answer", title: "Answer one weekly review question", category: "Review" },
  { id: "add-book-note", title: "Write one note from your current book", category: "Review" },
  { id: "add-review-sentence", title: "Add one sentence to a review", category: "Review" },
  { id: "backup-check", title: "Check when you last exported a backup", category: "Admin" },
  { id: "task-bank-clean", title: "Delete one task you do not want from this bank", category: "Admin" },
];

const guideNotes = [
  { id: 1, title: "Daily rhythm rules", category: "Life Guide", body: "Morning is for momentum. Daytime is for execution. Night is for review and reset. Keep the system simple enough that you actually use it. Win the first hour, then keep stacking small wins." },
  { id: 2, title: "When you feel stuck", category: "Life Guide", body: "Do not think your way out first. Move your body, clean one thing, drink water, pray, then do one small task. Momentum usually comes after movement, not before it." },
  { id: 3, title: "Relationship building rules", category: "People Guide", body: "Remember context, follow up before you need something, keep notes on interests and family, ask better questions, and be useful without being needy. The goal is to become trusted, not to force a sale." },
  { id: 4, title: "VIP relationship standard", category: "People Guide", body: "For VIP people, track last touch, what matters to them, their business, family/context, and the next thoughtful reason to reach out. Never only contact important people when you need something." },
  { id: 5, title: "Private aviation client mindset", category: "Charter Guide", body: "Clients care about trust, time, safety, flexibility, privacy, and not feeling sold. Be calm, clear, and useful. Explain options without overcomplicating things." },
  { id: 6, title: "Simple jet trip intake", category: "Charter Guide", body: "Ask for departure airport, arrival airport, dates, passenger count, luggage, pets, aircraft preference, timing flexibility, catering, ground transport, budget expectation, decision maker, and payment timing." },
  { id: 7, title: "Jet card sales angle", category: "Charter Guide", body: "Lead with simplicity and flexibility. A jet card is not just hours; it is less friction, faster booking, known pricing, aircraft access, and fewer headaches for someone who values time." },
  { id: 8, title: "Gatekeeper rule", category: "Charter Guide", body: "Be respectful and easy to deal with. Assistants and managers protect the principal’s time. Do not pitch too hard. Make yourself useful and low-friction." },
  { id: 9, title: "Follow-up rule", category: "Sales Guide", body: "Follow up like a professional, not like someone desperate. Short, useful, and relevant beats long and pushy. Always give a simple next step or helpful reason for the message." },
  { id: 10, title: "Communication standard", category: "Social Guide", body: "Be warm, direct, and human. Do not sound desperate. Do not overexplain. Make the next step easy for the other person. Say less, but make it clear." },
  { id: 11, title: "Better conversation habit", category: "Social Guide", body: "Ask about what they are building, what they are focused on, what they learned recently, or what they are excited about. People remember how easy and natural it felt to talk to you." },
  { id: 12, title: "Confidence rule", category: "Mindset Guide", body: "Confidence comes from preparation and follow-through. Keep promises to yourself, practice how you speak, clean your environment, train your body, and do the uncomfortable thing in small reps." },
  { id: 13, title: "Cut / fat loss basics", category: "Health Guide", body: "Hit protein, stay within calories, walk daily, lift consistently, sleep enough, and do not let one imperfect meal turn into a bad day. Simple always beats extreme if you actually repeat it." },
  { id: 14, title: "Food decision rule", category: "Health Guide", body: "Before eating random food, ask: does this help protein, calories, energy, or discipline? If not, pause and drink water first. You do not need perfect meals, just controlled decisions." },
  { id: 15, title: "Money standard", category: "Money Guide", body: "Track what you own, avoid dumb spending, build income skills, save before lifestyle inflation, and review your numbers weekly. Money gets easier when you stop hiding from the numbers." },
  { id: 16, title: "Weekly review rules", category: "Review Guide", body: "Be honest, not dramatic. Find the pattern, pick one correction, and make next week easier to win. Do not write a novel; write the truth and the next move." },
  { id: 17, title: "Personal standards", category: "Character Guide", body: "Be reliable, be early, be clean, be clear, be disciplined, and be someone people can trust with opportunity. Your standards should show before you speak." },
  { id: 18, title: "No zero day rule", category: "Discipline Guide", body: "Even on a bad day, do one thing for faith, one thing for health, one thing for your environment, and one thing for your future. Tiny wins keep identity alive." },
];

const conversationBank = [
  { id: 1, title: "Restart an old conversation", category: "Reconnect", line: "Hey [Name], random but you popped into my head today. How have you been?" },
  { id: 2, title: "Business check-in", category: "Networking", line: "Hey [Name], hope you’ve been good. What are you focused on business-wise right now?" },
  { id: 3, title: "Mentor question", category: "Mentor", line: "Quick question — if you were my age again, what skill would you double down on the hardest?" },
  { id: 4, title: "Aviation soft mention", category: "Aviation", line: "By the way, if private aviation ever comes up for you or someone close to you, I’m happy to be a resource." },
  { id: 5, title: "Follow-up without pressure", category: "Follow-up", line: "No rush at all — just wanted to keep this on your radar in case it becomes useful." },
  { id: 6, title: "Natural compliment", category: "Social", line: "I respect how you’ve built what you’re doing. It’s clear you’re intentional with it." },
  { id: 7, title: "Ask a better question", category: "Social", line: "What’s been the biggest thing you’ve learned recently?" },
  { id: 8, title: "Golf opener", category: "Social", line: "We should get a round in sometime. I’d enjoy hearing more about what you’re building." },
  { id: 9, title: "Assistant / gatekeeper opener", category: "Aviation", line: "Hi [Name], I know you probably handle a lot. I just wanted to introduce myself as a private aviation resource if it’s ever helpful." },
  { id: 10, title: "Old prospect reactivation", category: "Aviation", line: "Hey [Name], checking back in. Any private travel coming up where it would help to have options priced out?" },
  { id: 11, title: "Jet card intro", category: "Aviation", line: "We have a jet card program that works well for people who want flexibility without dealing with every trip from scratch. Happy to send a simple breakdown." },
  { id: 12, title: "Second-look offer", category: "Aviation", line: "If you ever want a second look on a quote or aircraft option, send it over. I’m happy to sanity-check it." },
  { id: 13, title: "Client discovery", category: "Aviation", line: "When you fly private, is the bigger priority guaranteed availability, aircraft quality, flexibility, or keeping pricing predictable?" },
  { id: 14, title: "Simple text after meeting", category: "Follow-up", line: "Great meeting you today. Enjoyed the conversation — let’s stay in touch." },
  { id: 15, title: "Value-first follow-up", category: "Follow-up", line: "Thought this might be useful based on what we talked about. No need to respond quickly — just wanted to pass it along." },
  { id: 16, title: "Mentor follow-up", category: "Mentor", line: "Appreciate the advice you gave me. I’m going to actually apply it and I’ll let you know how it goes." },
  { id: 17, title: "LinkedIn connection message", category: "LinkedIn", line: "Hey [Name], came across your profile and respect what you’re building. Wanted to connect." },
  { id: 18, title: "LinkedIn aviation intro", category: "LinkedIn", line: "Hey [Name], I work in private aviation with JetSet Group. Figured it would be good to connect in case I can ever be a resource." },
  { id: 19, title: "Ask for advice", category: "Networking", line: "I’m working on getting sharper in business and relationships. What’s one thing you think most young guys overlook?" },
  { id: 20, title: "Invite to quick call", category: "Networking", line: "Would be great to catch up for 10 minutes sometime this week. Nothing major — just wanted to hear what you’re working on." },
  { id: 21, title: "Warm check-in", category: "Relationships", line: "Hope you’ve been doing well. Anything exciting going on with you lately?" },
  { id: 22, title: "Thank-you message", category: "Relationships", line: "Just wanted to say I appreciate you. You’ve helped me more than you probably realize." },
  { id: 23, title: "Conversation starter", category: "Social", line: "What’s something you’re working toward right now that most people don’t know about?" },
  { id: 24, title: "Better small talk", category: "Social", line: "What’s been taking up most of your time lately?" },
  { id: 25, title: "Restart after delay", category: "Reconnect", line: "I know it’s been a little while — wanted to check in and see how everything’s been on your end." },
  { id: 26, title: "Soft close", category: "Sales", line: "Does it make sense for me to send over a few options so you can compare?" },
  { id: 27, title: "No-pressure close", category: "Sales", line: "No pressure either way — I can put together a quick look and you can tell me if it’s worth exploring." },
  { id: 28, title: "After sending quote", category: "Aviation", line: "Sent that over. Main things to look at are aircraft type, total price, terms, and flexibility. Happy to walk through it." },
  { id: 29, title: "Human intro", category: "Social", line: "I’m Aidan — I work in private aviation, but I’m really focused on building strong relationships and getting better in business." },
  { id: 30, title: "Polite bump", category: "Follow-up", line: "Just bumping this once so it doesn’t get buried. Totally understand if timing isn’t right." },
];

const defaultCharterNotes = [
  {
    id: 1,
    title: "First text to a warm prospect",
    category: "Text Script",
    body: "Hey [Name], Aidan here with JetSet Group. Wanted to put myself on your radar for any private aviation needs. We help clients with on-demand charter and jet card options depending on trip needs. Happy to be a resource whenever it makes sense."
  },
  {
    id: 2,
    title: "Simple assistant / gatekeeper text",
    category: "Text Script",
    body: "Hi [Name], this is Aidan with JetSet Group. I work with clients on private charter and jet card solutions. If [Principal's Name] ever needs aircraft options or wants a second look on pricing, I'm happy to help."
  },
  {
    id: 3,
    title: "Jet card follow-up email",
    category: "Email Script",
    body: `Subject: Private aviation resource

Hi [Name],

Wanted to quickly introduce myself. I'm with JetSet Group and help clients with private charter and jet card options based on schedule, aircraft preference, and flexibility needs.

If useful, I can send over a quick breakdown of available card options or help price out a specific trip.

Best,
Aidan`
  },
  {
    id: 4,
    title: "Trip quoting checklist",
    category: "Checklist",
    body: "Departure airport, arrival airport, dates, passenger count, luggage, pets, preferred aircraft size, flexibility on timing, catering needs, ground transport, budget expectation, decision maker, payment timing."
  },
  {
    id: 5,
    title: "Discovery questions",
    category: "Questions",
    body: "How often do you fly privately? What routes are most common? Do you prefer light, midsize, super-mid, or heavy jets? Is flexibility or guaranteed availability more important? Have you used a jet card before? What did you like or dislike?"
  },
  {
    id: 6,
    title: "Broker positioning reminder",
    category: "Notes",
    body: "Be calm, useful, and specific. Do not oversell. Lead with saving time, reducing friction, giving options, and being a reliable aviation resource."
  },
];

const bibleVerses = [
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
  { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
  { ref: "Joshua 1:9", text: "Be strong and of a good courage; be not afraid, neither be thou dismayed." },
  { ref: "Romans 8:28", text: "All things work together for good to them that love God, to them who are the called according to his purpose." },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God." },
  { ref: "Matthew 6:33", text: "Seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you." },
  { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
  { ref: "Psalm 46:10", text: "Be still, and know that I am God." },
  { ref: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally." },
  { ref: "Proverbs 16:3", text: "Commit thy works unto the Lord, and thy thoughts shall be established." },
  { ref: "Romans 12:2", text: "Be ye transformed by the renewing of your mind." },
  { ref: "Psalm 37:4", text: "Delight thyself also in the Lord; and he shall give thee the desires of thine heart." },
  { ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
  { ref: "John 14:27", text: "Peace I leave with you, my peace I give unto you." },
  { ref: "1 Corinthians 16:13", text: "Watch ye, stand fast in the faith, quit you like men, be strong." },
  { ref: "Colossians 3:23", text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men." },
  { ref: "Psalm 118:24", text: "This is the day which the Lord hath made; we will rejoice and be glad in it." },
  { ref: "Ephesians 6:10", text: "Be strong in the Lord, and in the power of his might." },
  { ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen." },
  { ref: "Proverbs 27:17", text: "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." },
  { ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path." },
  { ref: "Galatians 6:9", text: "Let us not be weary in well doing: for in due season we shall reap, if we faint not." },
  { ref: "Mark 10:27", text: "With men it is impossible, but not with God: for with God all things are possible." },
  { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
  { ref: "Psalm 34:4", text: "I sought the Lord, and he heard me, and delivered me from all my fears." },
  { ref: "Micah 6:8", text: "What doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?" },
  { ref: "John 15:5", text: "He that abideth in me, and I in him, the same bringeth forth much fruit." },
  { ref: "Psalm 27:1", text: "The Lord is my light and my salvation; whom shall I fear?" },
  { ref: "Proverbs 13:20", text: "He that walketh with wise men shall be wise." },
  { ref: "Psalm 19:14", text: "Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight." },
  { ref: "Proverbs 4:23", text: "Keep thy heart with all diligence; for out of it are the issues of life." },
  { ref: "Isaiah 40:31", text: "They that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles." },
  { ref: "Psalm 55:22", text: "Cast thy burden upon the Lord, and he shall sustain thee." },
  { ref: "Matthew 5:16", text: "Let your light so shine before men, that they may see your good works." },
  { ref: "Proverbs 18:16", text: "A man's gift maketh room for him, and bringeth him before great men." },
  { ref: "Psalm 121:1-2", text: "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord." },
  { ref: "Romans 5:3-4", text: "Tribulation worketh patience; and patience, experience; and experience, hope." },
  { ref: "James 1:22", text: "Be ye doers of the word, and not hearers only." },
  { ref: "Proverbs 21:5", text: "The thoughts of the diligent tend only to plenteousness." },
  { ref: "Psalm 31:24", text: "Be of good courage, and he shall strengthen your heart." },
  { ref: "Matthew 7:7", text: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you." },
  { ref: "Romans 10:17", text: "Faith cometh by hearing, and hearing by the word of God." },
  { ref: "Proverbs 24:16", text: "For a just man falleth seven times, and riseth up again." },
  { ref: "Psalm 56:3", text: "What time I am afraid, I will trust in thee." },
  { ref: "John 8:32", text: "And ye shall know the truth, and the truth shall make you free." },
  { ref: "Proverbs 11:14", text: "Where no counsel is, the people fall: but in the multitude of counsellors there is safety." },
  { ref: "Psalm 90:12", text: "So teach us to number our days, that we may apply our hearts unto wisdom." },
  { ref: "Luke 1:37", text: "For with God nothing shall be impossible." },
  { ref: "1 Thessalonians 5:16-18", text: "Rejoice evermore. Pray without ceasing. In every thing give thanks." },
  { ref: "Proverbs 22:29", text: "Seest thou a man diligent in his business? he shall stand before kings." },
  { ref: "Psalm 1:1-2", text: "Blessed is the man that walketh not in the counsel of the ungodly... his delight is in the law of the Lord." },
  { ref: "Matthew 22:37", text: "Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind." },
  { ref: "Romans 15:13", text: "Now the God of hope fill you with all joy and peace in believing." },
  { ref: "Proverbs 15:22", text: "Without counsel purposes are disappointed: but in the multitude of counsellors they are established." },
  { ref: "Psalm 139:23-24", text: "Search me, O God, and know my heart: try me, and know my thoughts." },
  { ref: "John 16:33", text: "In the world ye shall have tribulation: but be of good cheer; I have overcome the world." },
  { ref: "Proverbs 10:4", text: "The hand of the diligent maketh rich." },
  { ref: "Psalm 16:8", text: "I have set the Lord always before me: because he is at my right hand, I shall not be moved." },
  { ref: "Matthew 19:26", text: "With God all things are possible." },
  { ref: "Romans 12:11", text: "Not slothful in business; fervent in spirit; serving the Lord." },
  { ref: "Proverbs 29:18", text: "Where there is no vision, the people perish." },
  { ref: "Psalm 91:2", text: "I will say of the Lord, He is my refuge and my fortress: my God; in him will I trust." },
  { ref: "James 4:8", text: "Draw nigh to God, and he will draw nigh to you." },
  { ref: "1 Corinthians 10:31", text: "Whether therefore ye eat, or drink, or whatsoever ye do, do all to the glory of God." },
  { ref: "Psalm 62:6", text: "He only is my rock and my salvation: he is my defence; I shall not be moved." },
  { ref: "Proverbs 14:23", text: "In all labour there is profit." },
  { ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son." },
  { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." },
  { ref: "Proverbs 17:17", text: "A friend loveth at all times, and a brother is born for adversity." },
  { ref: "Hebrews 12:1", text: "Let us run with patience the race that is set before us." },
  { ref: "Psalm 103:2", text: "Bless the Lord, O my soul, and forget not all his benefits." },
];

const motivationalQuotes = [
  { quote: "Discipline is choosing what you want most over what you want now.", author: "Personal OS" },
  { quote: "Confidence is built by keeping promises to yourself.", author: "Personal OS" },
  { quote: "Move with urgency, but think with patience.", author: "Personal OS" },
  { quote: "Become the type of man people trust with serious opportunities.", author: "Personal OS" },
  { quote: "Your network is built one thoughtful touchpoint at a time.", author: "Personal OS" },
  { quote: "Every small win is proof that you are becoming different.", author: "Personal OS" },
  { quote: "Do not wait to feel ready. Build readiness through action.", author: "Personal OS" },
  { quote: "Your standards are revealed by what you repeat.", author: "Personal OS" },
  { quote: "A sharp mind, a healthy body, and a clean heart are daily work.", author: "Personal OS" },
  { quote: "Make the next right move, then make the next one after that.", author: "Personal OS" },
  { quote: "Big goals are reached through boring consistency.", author: "Personal OS" },
  { quote: "Win privately before you ask to win publicly.", author: "Personal OS" },
  { quote: "The man who controls his day controls his direction.", author: "Personal OS" },
  { quote: "Do the hard thing early and the rest of the day respects you.", author: "Personal OS" },
  { quote: "Your future needs your focus more than your comfort.", author: "Personal OS" },
  { quote: "If it matters, track it. If it is tracked, improve it.", author: "Personal OS" },
  { quote: "A good reputation is built in quiet moments of follow-through.", author: "Personal OS" },
  { quote: "Be the calmest person in the room and the most prepared.", author: "Personal OS" },
  { quote: "The next level requires a cleaner routine.", author: "Personal OS" },
  { quote: "You do not need more pressure; you need more structure.", author: "Personal OS" },
  { quote: "Be useful, be consistent, and be hard to ignore.", author: "Personal OS" },
  { quote: "Great relationships are maintained before they are needed.", author: "Personal OS" },
  { quote: "Success favors the person who follows up.", author: "Personal OS" },
  { quote: "Do not confuse motion with progress. Choose the move that matters.", author: "Personal OS" },
  { quote: "A strong day starts with a clear first action.", author: "Personal OS" },
  { quote: "You are always training for something, whether you realize it or not.", author: "Personal OS" },
  { quote: "Clean inputs create clean outputs.", author: "Personal OS" },
  { quote: "Become excellent at the basics and doors will open.", author: "Personal OS" },
  { quote: "The right circle will raise your ceiling.", author: "Personal OS" },
  { quote: "Do not chase status. Build substance.", author: "Personal OS" },
  { quote: "Every day is a deposit into the man you are becoming.", author: "Personal OS" },
  { quote: "Strong people do not need perfect days to make progress.", author: "Personal OS" },
  { quote: "Your word should be expensive. Spend it carefully and honor it fully.", author: "Personal OS" },
  { quote: "Faith, fitness, focus, and follow-up. Keep it simple.", author: "Personal OS" },
  { quote: "The disciplined man gets options. The undisciplined man gets excuses.", author: "Personal OS" },
  { quote: "Protect your morning like it belongs to your future.", author: "Personal OS" },
  { quote: "Be early, be prepared, be respectful, be memorable.", author: "Personal OS" },
  { quote: "Your habits are your silent business partners.", author: "Personal OS" },
  { quote: "Do not let one bad hour become a bad day.", author: "Personal OS" },
  { quote: "The standard is not perfection. The standard is return.", author: "Personal OS" },
  { quote: "A focused man is dangerous to his old life.", author: "Personal OS" },
  { quote: "The best version of you is built through ordinary days done well.", author: "Personal OS" },
  { quote: "Keep your promises small enough to complete and serious enough to matter.", author: "Personal OS" },
  { quote: "If you want better opportunities, become better at being trusted.", author: "Personal OS" },
  { quote: "Your calendar tells the truth about your priorities.", author: "Personal OS" },
  { quote: "The first rep is mental. The second rep is physical.", author: "Personal OS" },
  { quote: "Be patient with the outcome and aggressive with the input.", author: "Personal OS" },
  { quote: "No wasted conversations. No wasted days.", author: "Personal OS" },
  { quote: "A man with a system beats a man with a mood.", author: "Personal OS" },
  { quote: "If you slipped yesterday, respond with structure today.", author: "Personal OS" },
  { quote: "Do not ask for a bigger life while protecting smaller habits.", author: "Personal OS" },
  { quote: "Be the person your goals require when no one is watching.", author: "Personal OS" },
  { quote: "Start with what is in front of you. Finish what you started.", author: "Personal OS" },
  { quote: "Your body carries your ambition. Take care of it.", author: "Personal OS" },
  { quote: "Your faith should steady you, not sit on the shelf.", author: "Personal OS" },
  { quote: "Every follow-up is a chance to separate from the average.", author: "Personal OS" },
  { quote: "A better life is usually a better routine repeated long enough.", author: "Personal OS" },
  { quote: "Build quietly. Improve visibly. Speak carefully.", author: "Personal OS" },
  { quote: "Your next breakthrough may be hidden inside your next disciplined day.", author: "Personal OS" },
  { quote: "Small daily standards create large future freedom.", author: "Personal OS" },
  { quote: "One clean day can restart your momentum.", author: "Personal OS" },
  { quote: "Be where your feet are, but build where your vision points.", author: "Personal OS" },
  { quote: "Nobody is coming to save your discipline. Build it today.", author: "Personal OS" },
  { quote: "The version of you that wins does not negotiate with weakness.", author: "Personal OS" },
  { quote: "You are one hard decision away from proving you are different.", author: "Personal OS" },
  { quote: "Do the task while your excuses are still talking.", author: "Personal OS" },
  { quote: "You do not need a perfect plan. You need a finished rep.", author: "Personal OS" },
  { quote: "Your future is watching what you tolerate today.", author: "Personal OS" },
  { quote: "Hard days are where serious men separate themselves.", author: "Personal OS" },
  { quote: "If you feel lazy, make the first move smaller, not optional.", author: "Personal OS" },
  { quote: "You build self-respect every time you do what you said you would do.", author: "Personal OS" },
  { quote: "Comfort is expensive. Discipline pays you back.", author: "Personal OS" },
  { quote: "The room, the body, the money, the mind — clean them one at a time.", author: "Personal OS" },
  { quote: "Your standards either protect your future or sabotage it.", author: "Personal OS" },
  { quote: "Be stronger than the first excuse.", author: "Personal OS" },
  { quote: "The win is not feeling motivated. The win is moving anyway.", author: "Personal OS" },
  { quote: "You are not tired of the work. You are tired of breaking promises to yourself.", author: "Personal OS" },
  { quote: "Train your mind to obey before your mood gets a vote.", author: "Personal OS" },
  { quote: "The fastest way to feel better is to take command of the next five minutes.", author: "Personal OS" },
  { quote: "Every lazy decision has interest. Every disciplined decision compounds.", author: "Personal OS" },
  { quote: "You do not become elite by doing average things when no one is watching.", author: "Personal OS" },
  { quote: "The man you want to become is built in the tasks you keep avoiding.", author: "Personal OS" },
  { quote: "Do not lower the goal. Raise the standard of the day.", author: "Personal OS" },
  { quote: "When you want to quit, shrink the task and keep the promise.", author: "Personal OS" },
  { quote: "Make your environment respect your ambition.", author: "Personal OS" },
  { quote: "Your habits are either employees or enemies. Hire better ones.", author: "Personal OS" },
  { quote: "A serious life is built through unserious-looking daily actions.", author: "Personal OS" },
  { quote: "When the day gets messy, return to the system.", author: "Personal OS" },
  { quote: "The strongest man in the room is usually the one most in control of himself.", author: "Personal OS" },
  { quote: "Be faithful with the small things until the big things trust you.", author: "Personal OS" },
  { quote: "You are not stuck. You are one honest action away from momentum.", author: "Personal OS" },
  { quote: "Win the next hour. Then win the next one.", author: "Personal OS" },
  { quote: "Do not drift into the man you fear becoming.", author: "Personal OS" },
  { quote: "If you want a bigger life, become harder to distract.", author: "Personal OS" },
  { quote: "Success is never owned. It is rented, and the rent is due every day.", author: "Traditional" },
  { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { quote: "Lost time is never found again.", author: "Benjamin Franklin" },
  { quote: "The secret of getting ahead is getting started.", author: "Traditional" },
  { quote: "Action cures fear.", author: "Traditional" },
  { quote: "The man who moves a mountain begins by carrying away small stones.", author: "Traditional" },
  { quote: "Do not count the days. Make the days count.", author: "Traditional" },
  { quote: "Win the morning, win the day.", author: "Traditional" },
  { quote: "You can have results or excuses, not both.", author: "Traditional" },
];

const macroDatabase = [
  { keyword: "chicken breast", aliases: ["chicken breast", "grilled chicken"], calories: 165, protein: 31, carbs: 0, fat: 4, unit: "serving" },
  { keyword: "chicken", aliases: ["chicken"], calories: 220, protein: 40, carbs: 0, fat: 5, unit: "serving" },
  { keyword: "steak", aliases: ["steak", "sirloin", "filet"], calories: 350, protein: 35, carbs: 0, fat: 22, unit: "serving" },
  { keyword: "ground beef", aliases: ["ground beef", "beef bowl"], calories: 300, protein: 28, carbs: 0, fat: 20, unit: "serving" },
  { keyword: "salmon", aliases: ["salmon"], calories: 320, protein: 34, carbs: 0, fat: 18, unit: "serving" },
  { keyword: "tuna", aliases: ["tuna"], calories: 130, protein: 28, carbs: 0, fat: 1, unit: "can" },
  { keyword: "turkey", aliases: ["turkey"], calories: 170, protein: 30, carbs: 0, fat: 5, unit: "serving" },
  { keyword: "egg", aliases: ["egg", "eggs"], calories: 70, protein: 6, carbs: 1, fat: 5, unit: "egg" },
  { keyword: "egg whites", aliases: ["egg whites", "egg white"], calories: 120, protein: 26, carbs: 2, fat: 0, unit: "cup" },
  { keyword: "rice", aliases: ["rice", "white rice", "brown rice"], calories: 200, protein: 4, carbs: 45, fat: 0, unit: "cup" },
  { keyword: "potato", aliases: ["potato", "baked potato"], calories: 160, protein: 4, carbs: 37, fat: 0, unit: "potato" },
  { keyword: "sweet potato", aliases: ["sweet potato"], calories: 180, protein: 4, carbs: 41, fat: 0, unit: "potato" },
  { keyword: "oats", aliases: ["oats", "oatmeal", "oat"], calories: 150, protein: 5, carbs: 27, fat: 3, unit: "serving" },
  { keyword: "banana", aliases: ["banana"], calories: 105, protein: 1, carbs: 27, fat: 0, unit: "banana" },
  { keyword: "apple", aliases: ["apple"], calories: 95, protein: 0, carbs: 25, fat: 0, unit: "apple" },
  { keyword: "berries", aliases: ["berries", "blueberries", "strawberries"], calories: 80, protein: 1, carbs: 18, fat: 0, unit: "cup" },
  { keyword: "avocado", aliases: ["avocado"], calories: 240, protein: 3, carbs: 12, fat: 22, unit: "avocado" },
  { keyword: "protein shake", aliases: ["protein shake", "protein powder", "whey"], calories: 150, protein: 25, carbs: 4, fat: 2, unit: "scoop" },
  { keyword: "greek yogurt", aliases: ["greek yogurt", "yogurt"], calories: 130, protein: 18, carbs: 8, fat: 0, unit: "cup" },
  { keyword: "salad", aliases: ["salad"], calories: 120, protein: 5, carbs: 15, fat: 5, unit: "bowl" },
  { keyword: "broccoli", aliases: ["broccoli"], calories: 55, protein: 4, carbs: 11, fat: 0, unit: "cup" },
  { keyword: "asparagus", aliases: ["asparagus"], calories: 40, protein: 4, carbs: 7, fat: 0, unit: "serving" },
  { keyword: "wrap", aliases: ["wrap", "tortilla"], calories: 140, protein: 4, carbs: 24, fat: 4, unit: "wrap" },
  { keyword: "bread", aliases: ["bread", "toast"], calories: 90, protein: 4, carbs: 16, fat: 1, unit: "slice" },
  { keyword: "cheese", aliases: ["cheese"], calories: 110, protein: 7, carbs: 1, fat: 9, unit: "slice" },
  { keyword: "peanut butter", aliases: ["peanut butter"], calories: 190, protein: 8, carbs: 7, fat: 16, unit: "tbsp" },
];

const quickMeals = [
  "chicken breast rice broccoli",
  "steak potato asparagus",
  "salmon rice salad",
  "2 eggs oats banana",
  "greek yogurt berries protein shake",
  "turkey wrap avocado",
];

const iconMap = { BookOpen, Brain, Languages, Flag, Dumbbell, MessageCircle, Users, CheckCircle2 };

function loadState() {
  try {
    if (typeof window === "undefined") return null;
    const saved = window.localStorage.getItem("personal-life-dashboard-v4");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export default function PersonalLifeDashboardApp() {
  const [savedState] = useState(() => loadState());
  const [habits, setHabits] = useState(savedState?.habits || defaultHabits);
  const [checks, setChecks] = useState(savedState?.checks || {});
  const [goals, setGoals] = useState(savedState?.goals || defaultGoals);
  const [people, setPeople] = useState(savedState?.people || defaultPeople);
  const [assets, setAssets] = useState(savedState?.assets || defaultAssets);
  const [calendarEvents] = useState(savedState?.calendarEvents || defaultCalendarEvents);
  const [calorieLimit, setCalorieLimit] = useState(savedState?.calorieLimit || 2000);
  const [proteinTarget, setProteinTarget] = useState(savedState?.proteinTarget || 180);
  const [waterGoal, setWaterGoal] = useState(savedState?.waterGoal || 128);
  const [waterDrank, setWaterDrank] = useState(savedState?.waterDrank || 0);
  const [meals, setMeals] = useState(savedState?.meals || []);
  const [journalEntries, setJournalEntries] = useState(savedState?.journalEntries || []);
  const [reviews, setReviews] = useState(savedState?.reviews || []);
  const [routineChecks, setRoutineChecks] = useState(savedState?.routineChecks || {});
  const [charterNotes, setCharterNotes] = useState(savedState?.charterNotes || defaultCharterNotes);
  const [weeklyReviews, setWeeklyReviews] = useState(savedState?.weeklyReviews || []);
  const [taskChecks, setTaskChecks] = useState(savedState?.taskChecks || {});
  const [actionOptions, setActionOptions] = useState(savedState?.actionOptions || defaultActionTasks);
  const [randomAction, setRandomAction] = useState(savedState?.randomAction || null);
  const [randomMission, setRandomMission] = useState(savedState?.randomMission || null);
  const [xpToast, setXpToast] = useState(null);
  const [appToast, setAppToast] = useState(null);
  const [weeklyAnswers, setWeeklyAnswers] = useState(savedState?.weeklyAnswers || {});
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [mealText, setMealText] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [peopleSearch, setPeopleSearch] = useState("");
  const [journalText, setJournalText] = useState(savedState?.journalText || "");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewType, setReviewType] = useState("Book");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewNotes, setReviewNotes] = useState("");
  const [newCharterTitle, setNewCharterTitle] = useState("");
  const [newCharterBody, setNewCharterBody] = useState("");
  const [activeTab, setActiveTab] = useState("today");
  const [weather, setWeather] = useState(savedState?.weather || { status: "idle", temp: null, label: "Weather", city: "Local" });

  const showToast = (message) => {
    setAppToast({ message, id: Date.now() });
    if (typeof window !== "undefined") window.setTimeout(() => setAppToast(null), 1800);
  };

  const date = todayKey();
  const formattedDate = new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const todaysChecks = checks[date] || {};
  const rotationDay = dayOfYear();
  const verseOfDay = bibleVerses[rotationDay % bibleVerses.length];
  const quoteOfDay = motivationalQuotes[(rotationDay * 3) % motivationalQuotes.length];
  const affirmationOfDay = affirmationBank[(rotationDay * 5) % affirmationBank.length];

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.title = "Command Center";

    const upsertMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const upsertLink = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#050505"/><circle cx="256" cy="256" r="150" fill="#ff5a00" opacity="0.18"/><path d="M256 92l118 58v93c0 83-50 141-118 177-68-36-118-94-118-177v-93l118-58z" fill="#ff5a00"/><path d="M256 142l76 37v64c0 54-31 91-76 118-45-27-76-64-76-118v-64l76-37z" fill="#050505"/><path d="M256 188l52 78h-35v78h-34v-78h-35l52-78z" fill="#ffffff"/></svg>`;
    const iconHref = `data:image/svg+xml,${encodeURIComponent(iconSvg)}`;

    upsertMeta("theme-color", "#050505");
    upsertMeta("viewport", "width=device-width, initial-scale=1, viewport-fit=cover");
    upsertMeta("mobile-web-app-capable", "yes");
    upsertMeta("apple-mobile-web-app-capable", "yes");
    upsertMeta("apple-mobile-web-app-title", "Command Center");
    upsertMeta("apple-mobile-web-app-status-bar-style", "black-translucent");
    upsertLink("icon", iconHref);
    upsertLink("apple-touch-icon", iconHref);

    try {
      const manifest = {
        name: "Command Center",
        short_name: "Command",
        start_url: ".",
        display: "standalone",
        background_color: "#050505",
        theme_color: "#050505",
        icons: [{ src: iconHref, sizes: "512x512", type: "image/svg+xml", purpose: "any maskable" }],
      };
      const manifestUrl = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" }));
      upsertLink("manifest", manifestUrl);
    } catch {
      // Manifest setup is best-effort in preview environments.
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(
        "personal-life-dashboard-v4",
        JSON.stringify({ habits, checks, goals, people, assets, calendarEvents, weather, calorieLimit, proteinTarget, waterGoal, waterDrank, meals, journalEntries, reviews, journalText, routineChecks, charterNotes, weeklyReviews, weeklyAnswers, taskChecks, actionOptions, randomAction, randomMission })
      );
    } catch {
      // Ignore storage errors in preview/sandbox environments.
    }
  }, [habits, checks, goals, people, assets, calendarEvents, weather, calorieLimit, proteinTarget, waterGoal, waterDrank, meals, journalEntries, reviews, journalText, routineChecks, charterNotes, weeklyReviews, weeklyAnswers, taskChecks, actionOptions, randomAction, randomMission]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setWeather((prev) => ({ ...prev, status: "unavailable" }));
      return;
    }

    let cancelled = false;
    setWeather((prev) => ({ ...prev, status: "loading" }));
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`);
          const data = await response.json();
          if (cancelled) return;
          const currentTemp = data?.current?.temperature_2m;
          setWeather({
            status: "ready",
            temp: Number.isFinite(currentTemp) ? Math.round(currentTemp) : null,
            label: weatherCodeLabel(data?.current?.weather_code),
            city: "Local",
          });
        } catch {
          if (!cancelled) setWeather((prev) => ({ ...prev, status: "error" }));
        }
      },
      () => {
        if (!cancelled) setWeather((prev) => ({ ...prev, status: "permission" }));
      },
      { maximumAge: 1000 * 60 * 20, timeout: 8000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const completedCount = habits.filter((habit) => Boolean(todaysChecks[habit.id])).length;
  const dailyScore = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;
  const totalAssets = assets.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const nutritionTotals = meals.reduce(
    (sum, meal) => ({ calories: sum.calories + meal.calories, protein: sum.protein + meal.protein, carbs: sum.carbs + meal.carbs, fat: sum.fat + meal.fat }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
  const caloriesLeft = Math.max(0, Number(calorieLimit || 0) - nutritionTotals.calories);
  const proteinLeft = Math.max(0, Number(proteinTarget || 0) - nutritionTotals.protein);
  const waterLeft = Math.max(0, Number(waterGoal || 0) - Number(waterDrank || 0));
  const calorieProgress = Math.min(100, Math.round((nutritionTotals.calories / Number(calorieLimit || 1)) * 100));
  const proteinProgress = Math.min(100, Math.round((nutritionTotals.protein / Number(proteinTarget || 1)) * 100));
  const waterProgress = Math.min(100, Math.round((Number(waterDrank || 0) / Number(waterGoal || 1)) * 100));
  const todaysRoutine = routineChecks[date] || {};
  const todaysTasks = taskChecks[date] || {};
  const morningDone = morningRoutine.filter((item) => todaysRoutine[`morning-${item}`]).length;
  const nightDone = nightRoutine.filter((item) => todaysRoutine[`night-${item}`]).length;
  const morningScore = Math.round((morningDone / morningRoutine.length) * 100);
  const nightScore = Math.round((nightDone / nightRoutine.length) * 100);
  const nutritionScore = Math.round((Math.min(100, calorieProgress) + Math.min(100, proteinProgress) + Math.min(100, waterProgress)) / 3);
  const journalScore = journalEntries.some((entry) => entry.date === date) || journalText.trim().length > 0 ? 100 : 0;
  const dailyPerformanceScore = Math.round((dailyScore * 0.35) + (morningScore * 0.2) + (nightScore * 0.15) + (nutritionScore * 0.2) + (journalScore * 0.1));
  const xpToday = Math.round(dailyPerformanceScore * 10 + completedCount * 25 + morningDone * 15 + nightDone * 10 + meals.length * 10 + journalScore);
  const completedTaskXp = Object.values(todaysTasks).filter(Boolean).length * 25;
  const totalXpToday = xpToday + completedTaskXp;
  const level = Math.max(1, Math.floor(totalXpToday / 500) + 1);
  const levelProgress = Math.min(100, Math.round((totalXpToday % 500) / 5));

  const streak = useMemo(() => {
    const days = Object.values(checks).filter((day) => Object.values(day || {}).some(Boolean)).length;
    return Math.max(days, completedCount > 0 ? 1 : 0);
  }, [checks, completedCount]);

  const statsData = useMemo(() => {
    const totalHabitCompletions = Object.values(checks).reduce((sum, day) => sum + Object.values(day || {}).filter(Boolean).length, 0);
    const totalRoutineCompletions = Object.values(routineChecks).reduce((sum, day) => sum + Object.values(day || {}).filter(Boolean).length, 0);
    const totalMissionCompletions = Object.values(taskChecks).reduce((sum, day) => sum + Object.values(day || {}).filter(Boolean).length, 0);
    const totalMealsLogged = meals.length;
    const totalJournalEntries = journalEntries.length;
    const totalReviews = reviews.length;
    const totalWeeklyReviews = weeklyReviews.length;
    const averageReview = reviews.length ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1) : "0.0";
    return { totalHabitCompletions, totalRoutineCompletions, totalMissionCompletions, totalMealsLogged, totalJournalEntries, totalReviews, totalWeeklyReviews, averageReview };
  }, [checks, routineChecks, taskChecks, meals, journalEntries, reviews, weeklyReviews]);

  const statCards = [
    { label: "Daily Score", value: `${dailyPerformanceScore}%`, sub: "overall performance", icon: TrendingUp },
    { label: "Key People", value: people.length, sub: "business relationships", icon: Users },
    { label: "Level", value: level, sub: `${totalXpToday} XP today`, icon: Award },
    { label: "Net Worth", value: `$${totalAssets.toLocaleString()}`, sub: "assets tracked", icon: Wallet },
    { label: "Calories Left", value: caloriesLeft, sub: `${nutritionTotals.calories} eaten today`, icon: Utensils },
  ];

  const primaryTabs = [
    { id: "today", label: "Today" },
    { id: "routine", label: "Routine" },
    { id: "crm", label: "People" },
    { id: "journal", label: "Journal" },
    { id: "calories", label: "Food" },
  ];

  const moreTabs = [
    { id: "stats", label: "Stats" },
    { id: "now", label: "Mission" },
    { id: "charter", label: "Charter" },
    { id: "finance", label: "Money" },
    { id: "goals", label: "Goals" },
    { id: "motivation", label: "Motivation" },
    { id: "reviews", label: "Reviews" },
    { id: "guides", label: "Guides" },
    { id: "convo", label: "Convo" },
    { id: "affirmations", label: "Affirmations" },
    { id: "weekly", label: "Weekly" },
    { id: "export", label: "Backup" },
  ];


  const recommendedActions = [
    morningScore < 100 ? { title: "Finish your morning routine", category: "Routine" } : null,
    !todaysChecks.bible ? { title: "Read Bible before anything else", category: "Faith" } : null,
    waterProgress < 50 ? { title: "Drink 16 oz of water", category: "Body" } : null,
    proteinProgress < 50 ? { title: "Get a clean protein meal in", category: "Food" } : null,
    !journalScore ? { title: "Write a quick journal entry", category: "Mind" } : null,
    people.length < 5 ? { title: "Add one key person to your People list", category: "Relationships" } : null,
    { title: actionOptions[rotationDay % actionOptions.length]?.title || "Do one small useful thing", category: actionOptions[rotationDay % actionOptions.length]?.category || "Action" },
  ].filter(Boolean);

  const bestNextAction = recommendedActions[0] || actionOptions[rotationDay % actionOptions.length] || { title: "Do one small useful thing", category: "Action" };

  const toggleHabit = (habitId) => {
    const wasDone = Boolean(todaysChecks[habitId]);
    setChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [habitId]: !prev[date]?.[habitId] } }));
    if (!wasDone) showXpToast(25, "Non-negotiable complete");
  };


  const toggleRoutine = (key) => {
    const wasDone = Boolean(todaysRoutine[key]);
    setRoutineChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [key]: !prev[date]?.[key] } }));
    if (!wasDone) showXpToast(15, "Routine complete");
  };

  const toggleTask = (taskId) => {
    const task = actionOptions.find((item) => item.id === taskId);
    const wasDone = Boolean(todaysTasks[taskId]);
    setTaskChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [taskId]: !prev[date]?.[taskId] } }));
    if (!wasDone) showXpToast(getActionXp(task), "Mission task complete");
  };

  const getActionPool = () => {
    const unfinishedHabits = habits
      .filter((habit) => !todaysChecks[habit.id])
      .map((habit) => ({ id: `habit-${habit.id}`, title: habit.name, category: habit.category || "Habit", source: "habit" }));

    const unfinishedMorning = morningRoutine
      .filter((item) => !todaysRoutine[`morning-${item}`])
      .map((item) => ({ id: `morning-${item}`, title: item, category: "Routine", source: "routine" }));

    const unfinishedNight = nightRoutine
      .filter((item) => !todaysRoutine[`night-${item}`])
      .map((item) => ({ id: `night-${item}`, title: item, category: "Routine", source: "routine" }));

    const customTasks = actionOptions
      .filter((task) => !todaysTasks[task.id])
      .map((task) => ({ ...task, source: "task" }));

    return [...unfinishedHabits, ...unfinishedMorning, ...unfinishedNight, ...customTasks];
  };

  const showXpToast = (xp, label = "XP earned") => {
    setXpToast({ xp, label, id: Date.now() });
    if (typeof window !== "undefined") window.setTimeout(() => setXpToast(null), 1800);
  };

  const pickRandomAction = () => {
    const pool = getActionPool();
    setRandomMission(null);
    if (!pool.length) {
      setRandomAction({ id: "done", title: "You’re caught up. Take a walk, pray, or plan tomorrow.", category: "Reset", source: "system", xp: 0 });
      return;
    }
    const next = pool[Math.floor(Math.random() * pool.length)];
    setRandomAction({ ...next, xp: getActionXp(next) });
  };

  const pickRandomMission = () => {
    const pool = getActionPool();
    setRandomAction(null);
    if (!pool.length) {
      setRandomMission({ id: "mission-done", title: "All Clear Mission", tasks: [{ id: "reset", title: "Take a walk, pray, or plan tomorrow", category: "Reset", source: "system", xp: 20 }], bonus: 0 });
      return;
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, Math.floor(Math.random() * 3) + 3);
    const tasks = shuffled.slice(0, count).map((task) => ({ ...task, xp: getActionXp(task) }));
    const bonus = count >= 4 ? 50 : 25;
    setRandomMission({ id: Date.now(), title: "Side Mission", tasks, bonus });
  };

  const completeTaskObject = (task) => {
    if (!task) return;
    if (task.source === "habit") {
      const habitId = task.id.replace("habit-", "");
      setChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [habitId]: true } }));
    } else if (task.source === "routine") {
      setRoutineChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [task.id]: true } }));
    } else if (task.source === "task") {
      setTaskChecks((prev) => ({ ...prev, [date]: { ...(prev[date] || {}), [task.id]: true } }));
    }
  };

  const completeRandomAction = () => {
    if (!randomAction) return;
    const earned = randomAction.xp || getActionXp(randomAction);
    completeTaskObject(randomAction);
    showXpToast(earned, "Task complete");
    setRandomAction(null);
  };

  const completeRandomMission = () => {
    if (!randomMission?.tasks?.length) return;
    randomMission.tasks.forEach((task) => completeTaskObject(task));
    const earned = randomMission.tasks.reduce((sum, task) => sum + (task.xp || getActionXp(task)), 0) + (randomMission.bonus || 0);
    showXpToast(earned, "Mission complete");
    setRandomMission(null);
  };

  const removeActionOption = (taskId) => {
    setActionOptions((prev) => prev.filter((task) => task.id !== taskId));
    setTaskChecks((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((day) => {
        if (next[day]?.[taskId]) delete next[day][taskId];
      });
      return next;
    });
  };

  const addHabit = () => {
    const clean = newHabit.trim();
    if (!clean) return;
    setHabits((prev) => [...prev, { id: `${clean.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, name: clean, icon: "CheckCircle2", category: "Custom" }]);
    setNewHabit("");
    showToast("Habit added");
  };

  const removeHabit = (habitId) => setHabits((prev) => prev.filter((habit) => habit.id !== habitId));

  const updateGoal = (goalId, value) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, current: Number(value) } : goal)));
  };

  const goalStats = useMemo(() => goals.map((goal) => {
    let progress;
    if (goal.type === "down") progress = goal.current <= goal.target ? 100 : Math.max(0, Math.min(100, ((35 - goal.current) / (35 - goal.target)) * 100));
    else progress = Math.max(0, Math.min(100, (goal.current / goal.target) * 100));
    return { ...goal, progress: Math.round(progress) };
  }), [goals]);

  const addPerson = () => {
    const clean = newPerson.trim();
    if (!clean) return;
    setPeople((prev) => [{ id: Date.now(), name: clean, company: "", role: "", category: "Business", importance: "Medium", tags: "", phone: "", email: "", notes: "", lastTouch: "" }, ...prev]);
    setNewPerson("");
    showToast("Person added");
  };

  const updatePerson = (id, field, value) => {
    setPeople((prev) => prev.map((person) => (person.id === id ? { ...person, [field]: value } : person)));
  };

  const filteredPeople = people.filter((p) => `${p.name} ${p.company} ${p.role} ${p.category}`.toLowerCase().includes(peopleSearch.toLowerCase()));

  const updateMoneyItem = (id, value) => {
    setAssets((prev) => prev.map((item) => (item.id === id ? { ...item, value: Number(value) } : item)));
  };

  const updateMoneyName = (id, name) => {
    setAssets((prev) => prev.map((item) => (item.id === id ? { ...item, name } : item)));
  };

  const addMoneyItem = () => {
    setAssets((prev) => [...prev, { id: Date.now(), name: "New Asset", value: 0 }]);
    showToast("Asset added");
  };

  const getQuantityForFood = (text, food) => {
    const lower = text.toLowerCase();
    const aliases = food.aliases || [food.keyword];
    const matchAlias = aliases.find((alias) => lower.includes(alias));
    if (!matchAlias) return 0;
    const aliasIndex = lower.indexOf(matchAlias);
    const before = lower.slice(Math.max(0, aliasIndex - 18), aliasIndex).trim();
    const numberMatch = before.match(/([0-9]+([.][0-9]+)?) *$/);
    let quantity = numberMatch ? Number(numberMatch[1]) : 1;
    if (lower.includes(`half ${matchAlias}`) || before.endsWith("half")) quantity = 0.5;
    if (lower.includes(`double ${matchAlias}`) || before.endsWith("double")) quantity = 2;
    if (lower.includes(`2 ${matchAlias}`)) quantity = 2;
    if (lower.includes(`3 ${matchAlias}`)) quantity = 3;
    return quantity;
  };

  const estimateMeal = (text) => {
    const lower = text.toLowerCase();
    const matchedItems = macroDatabase.map((food) => ({ ...food, quantity: getQuantityForFood(lower, food) })).filter((food) => food.quantity > 0);
    const portionMultiplier = lower.includes("large") ? 1.25 : lower.includes("small") ? 0.75 : 1;
    const baseItems = matchedItems.length ? matchedItems : [{ keyword: "custom meal", calories: 450, protein: 30, carbs: 35, fat: 15, unit: "estimate", quantity: 1 }];
    const totals = baseItems.reduce((sum, food) => ({ calories: sum.calories + food.calories * food.quantity, protein: sum.protein + food.protein * food.quantity, carbs: sum.carbs + food.carbs * food.quantity, fat: sum.fat + food.fat * food.quantity }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    return { id: Date.now(), name: text, calories: Math.round(totals.calories * portionMultiplier), protein: Math.round(totals.protein * portionMultiplier), carbs: Math.round(totals.carbs * portionMultiplier), fat: Math.round(totals.fat * portionMultiplier), items: baseItems.map((food) => `${food.quantity} ${food.unit || "serving"} ${food.keyword}`) };
  };

  const addMealFromText = (text) => {
    const clean = text.trim();
    if (!clean) return;
    setMeals((prev) => [estimateMeal(clean), ...prev]);
  };

  const addMeal = () => {
    const clean = mealText.trim();
    if (!clean) return;
    addMealFromText(clean);
    setMealText("");
    showToast("Meal logged");
  };

  const saveJournal = () => {
    const clean = journalText.trim();
    if (!clean) return;
    setJournalEntries((prev) => [{ id: Date.now(), date, text: clean }, ...prev]);
    setJournalText("");
    showToast("Journal saved");
  };

  const saveReview = () => {
    const title = reviewTitle.trim();
    if (!title) return;
    setReviews((prev) => [{ id: Date.now(), title, type: reviewType, rating: Number(reviewRating), notes: reviewNotes, date }, ...prev]);
    setReviewTitle("");
    setReviewNotes("");
    setReviewRating(5);
    showToast("Review added");
  };

  const addCharterNote = () => {
    const title = newCharterTitle.trim();
    const body = newCharterBody.trim();
    if (!title || !body) return;
    setCharterNotes((prev) => [{ id: Date.now(), title, category: "Custom", body }, ...prev]);
    setNewCharterTitle("");
    setNewCharterBody("");
    showToast("Charter note saved");
  };

  const exportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      habits,
      checks,
      routineChecks,
      goals,
      people,
      assets,
      calendarEvents,
      meals,
      calorieLimit,
      proteinTarget,
      waterGoal,
      waterDrank,
      journalEntries,
      reviews,
      charterNotes,
      weeklyReviews,
      weeklyAnswers,
      taskChecks,
      actionOptions,
      randomAction,
      randomMission,
    };
    const data = JSON.stringify(backup, null, 2);
    try {
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `personal-os-backup-${date}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.prompt("Copy your backup data:", data);
    }
  };

  const copyBackup = async () => {
    const data = JSON.stringify({ habits, checks, routineChecks, goals, people, assets, calendarEvents, calorieLimit, proteinTarget, waterGoal, waterDrank, meals, journalEntries, reviews, charterNotes, weeklyReviews, weeklyAnswers, taskChecks, actionOptions, randomAction, randomMission }, null, 2);
    try {
      await navigator.clipboard.writeText(data);
      setImportStatus("Backup copied.");
      showToast("Backup copied");
    } catch {
      window.prompt("Copy your backup data:", data);
    }
  };

  const resetToday = () => {
    setChecks((prev) => ({ ...prev, [date]: {} }));
    setRoutineChecks((prev) => ({ ...prev, [date]: {} }));
    setTaskChecks((prev) => ({ ...prev, [date]: {} }));
    setRandomAction(null);
    setRandomMission(null);
    showToast("Today reset");
  };

  const importData = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed.habits) setHabits(parsed.habits);
      if (parsed.checks) setChecks(parsed.checks);
      if (parsed.routineChecks) setRoutineChecks(parsed.routineChecks);
      if (parsed.goals) setGoals(parsed.goals);
      if (parsed.people) setPeople(parsed.people);
      if (parsed.assets) setAssets(parsed.assets);
      if (parsed.meals) setMeals(parsed.meals);
      if (parsed.calorieLimit) setCalorieLimit(parsed.calorieLimit);
      if (parsed.proteinTarget) setProteinTarget(parsed.proteinTarget);
      if (parsed.waterGoal) setWaterGoal(parsed.waterGoal);
      if (parsed.waterDrank !== undefined) setWaterDrank(parsed.waterDrank);
      if (parsed.journalEntries) setJournalEntries(parsed.journalEntries);
      if (parsed.reviews) setReviews(parsed.reviews);
      if (parsed.charterNotes) setCharterNotes(parsed.charterNotes);
      if (parsed.weeklyReviews) setWeeklyReviews(parsed.weeklyReviews);
      if (parsed.weeklyAnswers) setWeeklyAnswers(parsed.weeklyAnswers);
      if (parsed.taskChecks) setTaskChecks(parsed.taskChecks);
      if (parsed.actionOptions) setActionOptions(parsed.actionOptions);
      if (parsed.randomAction) setRandomAction(parsed.randomAction);
      if (parsed.randomMission) setRandomMission(parsed.randomMission);
      setImportStatus("Import successful. Your backup has been restored.");
      setImportText("");
      showToast("Import successful");
    } catch {
      setImportStatus("Import failed. Make sure you pasted a valid JSON backup.");
    }
  };

  const saveWeeklyReview = () => {
    const hasContent = Object.values(weeklyAnswers).some((value) => String(value || "").trim());
    if (!hasContent) return;
    setWeeklyReviews((prev) => [{ id: Date.now(), date, answers: weeklyAnswers }, ...prev]);
    setWeeklyAnswers({});
    showToast("Weekly review saved");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-white md:pb-0">

      <div className="relative mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8" style={{ WebkitTapHighlightColor: "transparent" }}>
        {xpToast && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#ff5a00]/35 bg-black/90 px-6 py-4 text-center shadow-2xl backdrop-blur-xl md:bottom-6">
            <p className="text-2xl font-black text-[#ff5a00]">🔥 +{xpToast.xp} XP</p>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">{xpToast.label}</p>
          </motion.div>
        )}
        {appToast && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black shadow-2xl">
            {appToast.message}
          </motion.div>
        )}
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Command Center</h1>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-neutral-300">{formattedDate}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-white">
              <CloudSun size={16} />
              {weather.status === "ready" && weather.temp !== null ? `${weather.temp}° · ${weather.label}` : weather.status === "loading" ? "Loading weather" : weather.status === "permission" ? "Allow location for weather" : "Local weather"}
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-neutral-300">
              <MapPin size={16} /> {weather.city || "Local"}
            </div>
          </div>
        </header>

        <div className="mb-4 grid gap-3 xl:grid-cols-3">
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><BookOpen className="text-[#ff5a00]" /><h2 className="text-xl font-semibold">Verse</h2></div>
                <span className="rounded-full bg-black/25 px-3 py-1 text-xs text-[#ff5a00]">{verseOfDay.ref}</span>
              </div>
              <p className="text-sm leading-6 text-neutral-200">“{verseOfDay.text}”</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3"><Quote className="text-[#ff5a00]" /><h2 className="text-xl font-semibold">Quote</h2></div>
                <span className="rounded-full bg-black/25 px-3 py-1 text-xs text-[#ff5a00]">{quoteOfDay.author}</span>
              </div>
              <p className="text-sm leading-6 text-neutral-200">“{quoteOfDay.quote}”</p>
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3"><HeartHandshake className="text-[#ff5a00]" /><h2 className="text-xl font-semibold">Affirmation</h2></div>
              <p className="text-sm leading-6 text-neutral-200">“{affirmationOfDay}”</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between text-neutral-400"><p className="text-xs sm:text-sm">{item.label}</p><Icon size={18} /></div>
                  <p className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{item.value}</p>
                  <p className="mt-1 text-xs text-neutral-400 sm:text-sm">{item.sub}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <nav className="mb-4 rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
          <div className="hidden grid-cols-5 gap-1 md:grid">
            {primaryTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-2xl px-2 py-3 text-xs font-semibold transition sm:text-sm ${activeTab === tab.id ? "bg-white text-black shadow-xl" : "text-neutral-400 hover:text-white"}`}>{tab.label}</button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:mt-2">
            {moreTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`shrink-0 rounded-2xl px-4 py-2 text-xs font-semibold transition ${activeTab === tab.id ? "bg-white text-black shadow-xl" : "bg-black/20 text-neutral-400 hover:text-white"}`}>{tab.label}</button>
            ))}
          </div>
        </nav>

        <nav className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-40 rounded-[1.75rem] border border-white/10 bg-black/85 p-2 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="grid grid-cols-5 gap-1">
            {primaryTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`rounded-2xl px-1 py-3 text-[11px] font-semibold transition ${activeTab === tab.id ? "bg-white text-black shadow-xl" : "text-neutral-400"}`}>{tab.label}</button>
            ))}
          </div>
        </nav>

        {activeTab === "today" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] text-white shadow-2xl backdrop-blur-xl lg:col-span-3">
              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm text-neutral-400">Daily Performance Score</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{dailyPerformanceScore}%</h2>
                    <p className="mt-2 text-neutral-400">Habits, routines, nutrition, water, and journal combined.</p>
                    <div className="mt-5 max-w-sm">
                      <div className="mb-1 flex justify-between text-xs text-neutral-400"><span>Level {level}</span><span>{levelProgress}% to next level · {totalXpToday} XP</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-[#ff5a00]" style={{ width: `${levelProgress}%` }} /></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:min-w-[520px]">
                    {[['Habits', dailyScore], ['Morning', morningScore], ['Night', nightScore], ['Food', nutritionScore], ['Journal', journalScore]].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-center">
                        <p className="text-xl font-bold sm:text-2xl">{value}%</p>
                        <p className="mt-1 text-xs text-neutral-500">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {dailyPerformanceScore >= 100 && (
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-3">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center gap-4"><PartyPopper className="text-[#ff5a00]" size={32} /><div><h2 className="text-2xl font-bold">Day Complete 🔥</h2><p className="text-sm text-neutral-300">You handled your non-negotiables. Keep the standard.</p></div></div>
                </CardContent>
              </Card>
            )}

            <section className="lg:col-span-2">
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div><h2 className="text-xl font-semibold sm:text-2xl">Today&apos;s Non-Negotiables</h2><p className="text-sm text-neutral-400">Small wins stacked daily.</p></div>
                    <span className="rounded-full bg-[#ff5a00]/10 px-3 py-1 text-sm text-[#ff5a00]">{dailyScore}% complete</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {habits.map((habit) => {
                      const Icon = iconMap[habit.icon] || CheckCircle2;
                      const done = Boolean(todaysChecks[habit.id]);
                      return (
                        <div key={habit.id} className={`group rounded-3xl border p-4 transition ${done ? "border-white/10 bg-white/[0.06]" : "border-white/10 bg-black/25 hover:bg-white/[0.04]"}`}>
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3"><button onClick={() => toggleHabit(habit.id)}>{done ? <CheckCircle2 size={25} className="text-[#ff5a00]" /> : <Circle size={25} className="text-neutral-500" />}</button><div className="rounded-2xl bg-white/10 p-2"><Icon size={18} className="text-neutral-200" /></div></div>
                            <button onClick={() => removeHabit(habit.id)} className="rounded-xl p-2 text-neutral-600 opacity-0 transition hover:bg-white/10 hover:text-white group-hover:opacity-100"><Trash2 size={15} /></button>
                          </div>
                          <p className={`font-semibold ${done ? "text-white" : "text-white"}`}>{habit.name}</p>
                          <div className="mt-1 flex items-center justify-between gap-2"><p className="text-xs text-neutral-500">{habit.category}</p><span className="rounded-full bg-[#ff5a00]/10 px-2 py-1 text-xs font-bold text-[#ff5a00]">+25 XP</span></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex gap-2"><input value={newHabit} onChange={(e) => setNewHabit(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addHabit()} placeholder="Add another daily habit..." className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" /><Button onClick={addHabit} className="rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200"><Plus size={16} /></Button></div>
                </CardContent>
              </Card>
            </section>
            <aside className="space-y-4 lg:space-y-6">
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3"><CalendarDays className="text-[#ff5a00]" /><h2 className="text-xl font-semibold">Calendar</h2></div>
                    <span className="rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-[#ff5a00]">Google-style</span>
                  </div>
                  <div className="space-y-3">
                    {calendarEvents.map((event) => (
                      <div key={event.id} className="rounded-2xl border border-white/10 bg-black/25 p-3">
                        <p className="text-xs text-neutral-500">{event.time}</p>
                        <p className="mt-1 font-semibold">{event.title}</p>
                        <p className="mt-1 text-xs text-neutral-500">{event.location}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-neutral-500">Later this can connect to Google Calendar for real events. For now, this previews the widget style.</p>
                </CardContent>
              </Card>
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center gap-3"><Wand2 className="text-[#ff5a00]" /><h2 className="text-xl font-semibold">Mission</h2></div>
                  <p className="text-2xl font-bold leading-tight">{bestNextAction.title}</p>
                  <p className="mt-2 text-sm text-neutral-400">{bestNextAction.category}</p>
                  <Button onClick={() => setActiveTab("now")} className="mt-5 w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Open Mission</Button>
                </CardContent>
              </Card>
            </aside>
          </motion.div>
        )}

        {activeTab === "crm" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl"><CardContent className="p-5"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} /><input value={peopleSearch} onChange={(e) => setPeopleSearch(e.target.value)} placeholder="Search key people..." className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 outline-none focus:border-[#ff5a00]/60" /></div><div className="flex flex-1 gap-2"><input value={newPerson} onChange={(e) => setNewPerson(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPerson()} placeholder="Add person..." className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#ff5a00]/60" /><Button onClick={addPerson} className="rounded-2xl bg-white px-5 text-black hover:bg-neutral-200"><Plus size={16} /></Button></div></div></CardContent></Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPeople.length === 0 && (
                <Card className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] text-white shadow-2xl backdrop-blur-xl md:col-span-2 xl:col-span-3">
                  <CardContent className="p-6 text-center"><Users className="mx-auto mb-3 text-neutral-500" /><h3 className="text-lg font-semibold">No people found</h3><p className="mt-1 text-sm text-neutral-500">Add your first key person or change the search.</p></CardContent>
                </Card>
              )}
              {filteredPeople.map((p) => (
                <Card key={p.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl"><CardContent className="p-5"><div className="mb-4 flex items-start justify-between"><div className="rounded-2xl bg-white/10 p-3"><UserRound size={20} /></div><div className="flex gap-2"><select value={p.category} onChange={(e) => updatePerson(p.id, "category", e.target.value)} className="rounded-full border border-white/10 bg-black/50 px-3 py-2 text-base text-neutral-200 sm:py-1 sm:text-xs"><option>Mentor</option><option>Business</option><option>Aviation</option><option>Prospect</option><option>Friend</option><option>Family</option></select><select value={p.importance || "Medium"} onChange={(e) => updatePerson(p.id, "importance", e.target.value)} className="rounded-full border border-white/10 bg-black/50 px-3 py-2 text-base text-neutral-200 sm:py-1 sm:text-xs"><option>VIP</option><option>High</option><option>Medium</option><option>Low</option></select></div></div><input value={p.name} onChange={(e) => updatePerson(p.id, "name", e.target.value)} className="w-full bg-transparent text-lg font-semibold outline-none" placeholder="Name" /><div className="mt-3 grid gap-2"><div className="flex items-center gap-2"><Building2 size={14} className="text-neutral-500" /><input value={p.company} onChange={(e) => updatePerson(p.id, "company", e.target.value)} className="w-full bg-transparent text-base text-neutral-300 outline-none sm:text-sm" placeholder="Company / group" /></div><div className="flex items-center gap-2"><Briefcase size={14} className="text-neutral-500" /><input value={p.role} onChange={(e) => updatePerson(p.id, "role", e.target.value)} className="w-full bg-transparent text-base text-neutral-300 outline-none sm:text-sm" placeholder="Role" /></div><div className="flex items-center gap-2"><Phone size={14} className="text-neutral-500" /><input value={p.phone} onChange={(e) => updatePerson(p.id, "phone", e.target.value)} className="w-full bg-transparent text-base text-neutral-300 outline-none sm:text-sm" placeholder="Phone" /></div><div className="flex items-center gap-2"><Mail size={14} className="text-neutral-500" /><input value={p.email} onChange={(e) => updatePerson(p.id, "email", e.target.value)} className="w-full bg-transparent text-base text-neutral-300 outline-none sm:text-sm" placeholder="Email" /></div></div><input value={p.tags || ""} onChange={(e) => updatePerson(p.id, "tags", e.target.value)} placeholder="Tags: investor, mentor, aviation, golf, NYC..." className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" /><textarea value={p.notes} onChange={(e) => updatePerson(p.id, "notes", e.target.value)} placeholder="Notes, context, family, interests, next conversation angle..." className="mt-3 min-h-24 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" /><div className="mt-3 flex items-center justify-between gap-2"><input type="date" value={p.lastTouch} onChange={(e) => updatePerson(p.id, "lastTouch", e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-base text-neutral-300 outline-none sm:text-sm" /><button onClick={() => setPeople((prev) => prev.filter((person) => person.id !== p.id))} className="rounded-xl p-2 text-neutral-500 hover:bg-white/10 hover:text-white"><Trash2 size={16} /></button></div></CardContent></Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "routine" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3"><Sun className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Morning Routine</h2><p className="text-sm text-neutral-400">Start clean and get momentum early.</p></div></div>
                <div className="space-y-3">
                  {morningRoutine.map((item) => {
                    const key = `morning-${item}`;
                    const done = Boolean(todaysRoutine[key]);
                    return <button key={key} onClick={() => toggleRoutine(key)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${done ? "border-white/10 bg-white/[0.06]" : "border-white/10 bg-black/25 hover:bg-white/[0.04]"}`}>{done ? <CheckCircle2 className="text-[#ff5a00]" /> : <Circle className="text-neutral-500" />}<span className={done ? "text-neutral-400 line-through" : "text-white"}>{item}</span></button>;
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3"><Moon className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Night Routine</h2><p className="text-sm text-neutral-400">End the day calm and set up tomorrow.</p></div></div>
                <div className="space-y-3">
                  {nightRoutine.map((item) => {
                    const key = `night-${item}`;
                    const done = Boolean(todaysRoutine[key]);
                    return <button key={key} onClick={() => toggleRoutine(key)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${done ? "border-white/10 bg-white/[0.06]" : "border-white/10 bg-black/25 hover:bg-white/[0.04]"}`}>{done ? <CheckCircle2 className="text-[#ff5a00]" /> : <Circle className="text-neutral-500" />}<span className={done ? "text-neutral-400 line-through" : "text-white"}>{item}</span></button>;
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "now" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] text-white shadow-2xl backdrop-blur-xl lg:col-span-3">
              <CardContent className="p-6 sm:p-8">
                <div className="mx-auto max-w-4xl text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff5a00]">Mission Wheel</p>
                  <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Spin. Move. Earn XP.</h2>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-300">Pick one quick task or roll a side mission with a few small at-home moves across your habits, faith, body, business, and reset tasks.</p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <button onClick={pickRandomAction} className="rounded-[2rem] border border-[#ff5a00]/35 bg-[#ff5a00] px-8 py-8 text-left shadow-2xl transition hover:scale-[1.02] hover:bg-[#ff6b1a] active:scale-95">
                      <Shuffle className="mb-4" size={30} />
                      <p className="text-3xl font-black">One Spin</p>
                      <p className="mt-2 text-sm text-white">Land on one useful task.</p>
                    </button>
                    <button onClick={pickRandomMission} className="rounded-[2rem] border border-[#ff5a00]/30 bg-black/45 px-8 py-8 text-left shadow-2xl transition hover:scale-[1.02] hover:bg-[#ff5a00] active:scale-95">
                      <Swords className="mb-4" size={30} />
                      <p className="text-3xl font-black">Mission Mode</p>
                      <p className="mt-2 text-sm text-white">Roll a 3–5 task side mission.</p>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-3">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Result</p>
                    <h2 className="mt-1 text-2xl font-semibold">{randomMission?.tasks?.length ? "Mission Mode" : "One Spin"}</h2>
                    <p className="mt-1 text-sm text-neutral-400">{randomMission?.tasks?.length ? "A small batch of random tasks. More work, more XP." : "One useful task. Quick win, quick XP."}</p>
                  </div>
                  {randomMission?.tasks?.length ? (
                    <span className="rounded-full bg-[#ff5a00]/10 px-4 py-2 text-sm font-bold text-white">+{randomMission.tasks.reduce((sum, task) => sum + (task.xp || getActionXp(task)), 0) + (randomMission.bonus || 0)} XP</span>
                  ) : randomAction?.xp ? (
                    <span className="rounded-full bg-[#ff5a00]/10 px-4 py-2 text-sm font-bold text-[#ff5a00]">+{randomAction.xp} XP</span>
                  ) : null}
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5">
                  {randomMission?.tasks?.length ? (
                    <div className="space-y-3">
                      {randomMission.tasks.map((task, index) => (
                        <div key={`${task.id}-${index}`} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <div>
                            <p className="font-semibold">{task.title}</p>
                            <p className="mt-1 text-xs text-neutral-500">{task.category}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs font-bold text-[#ff5a00]">+{task.xp || getActionXp(task)}</span>
                        </div>
                      ))}
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white">Mission completion bonus: +{randomMission.bonus || 0} XP</div>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button onClick={completeRandomMission} className="rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200">Complete Mission + XP</Button>
                        <Button onClick={pickRandomMission} className="rounded-2xl bg-white/10 px-5 py-3 text-white hover:bg-white/20">Roll New Mission</Button>
                      </div>
                    </div>
                  ) : randomAction ? (
                    <div>
                      <p className="text-3xl font-bold leading-tight">{randomAction.title}</p>
                      <p className="mt-2 text-sm text-neutral-400">{randomAction.category}</p>
                      {randomAction.id !== "done" && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Button onClick={completeRandomAction} className="rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200">Mark Done + XP</Button>
                          <Button onClick={pickRandomAction} className="rounded-2xl bg-white/10 px-5 py-3 text-white hover:bg-white/20"><RotateCcw className="mr-2 inline" size={16} />Spin Again</Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-neutral-400">Choose One Spin or Mission Mode to get your next move.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-3">
              <CardContent className="p-6">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Task Bank</h2>
                    <p className="text-sm text-neutral-400">Delete anything you do not want included in spins or missions.</p>
                  </div>
                  <p className="text-sm text-neutral-500">{actionOptions.length} options</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {actionOptions.map((task) => {
                    const done = Boolean(todaysTasks[task.id]);
                    const xp = getActionXp(task);
                    return (
                      <div key={task.id} className={`rounded-2xl border p-4 transition ${done ? "border-white/10 bg-black/30" : "border-white/10 bg-black/25"}`}>
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-white">{task.category}</span><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">+{xp} XP</span></div>
                          <button onClick={() => removeActionOption(task.id)} className="rounded-xl p-2 text-neutral-500 hover:bg-white/10 hover:text-white"><Trash2 size={15} /></button>
                        </div>
                        <button onClick={() => toggleTask(task.id)} className="flex w-full items-start gap-3 text-left">
                          {done ? <CheckCircle2 className="mt-0.5 shrink-0 text-[#ff5a00]" size={20} /> : <Circle className="mt-0.5 shrink-0 text-neutral-500" size={20} />}
                          <span className={done ? "text-neutral-400 line-through" : "text-white"}>{task.title}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "guides" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl md:col-span-2 xl:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center gap-3"><ClipboardList className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Guides & Notes</h2><p className="text-sm text-neutral-400">Your starter playbook for life, business, aviation, discipline, health, and relationships.</p></div></div>
              </CardContent>
            </Card>
            {guideNotes.map((guide) => (
              <Card key={guide.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <span className="rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-white">{guide.category}</span>
                  <h3 className="mt-4 text-xl font-semibold">{guide.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-300">{guide.body}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "convo" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl md:col-span-2 xl:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center gap-3"><MessageCircle className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Conversation Bank</h2><p className="text-sm text-neutral-400">Lines you can use for networking, aviation, follow-ups, mentors, and restarting conversations.</p></div></div>
              </CardContent>
            </Card>
            {conversationBank.map((item) => (
              <Card key={item.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-[#ff5a00]">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-neutral-200">“{item.line}”</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "motivation" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl md:col-span-2 xl:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center gap-3"><Flame className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Motivation Bank</h2><p className="text-sm text-neutral-400">Hard-hitting reminders for discipline, faith, business, and momentum.</p></div></div>
              </CardContent>
            </Card>
            {motivationalQuotes.map((item, index) => (
              <Card key={`${item.author}-${index}`} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <Quote className="mb-4 text-[#ff5a00]" size={22} />
                  <p className="text-sm leading-6 text-neutral-200">“{item.quote}”</p>
                  <p className="mt-4 text-xs text-neutral-500">— {item.author}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "affirmations" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl md:col-span-2 xl:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center gap-3"><HeartHandshake className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Daily Affirmations</h2><p className="text-sm text-neutral-400">Read one in the morning and one at night. Let it become your self-talk.</p></div></div>
              </CardContent>
            </Card>
            {affirmationBank.map((item, index) => (
              <Card key={index} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-5">
                  <HeartHandshake className="mb-4 text-[#ff5a00]" size={22} />
                  <p className="text-sm leading-6 text-neutral-300">“{item}”</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "weekly" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3"><CheckSquare className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Weekly Review</h2><p className="text-sm text-neutral-400">Use this once a week to stay honest and improve. Saved reviews live in Stats.</p></div></div>
                <div className="space-y-4">
                  {weeklyReviewPrompts.map((prompt) => (
                    <div key={prompt}>
                      <label className="text-sm font-medium text-neutral-300">{prompt}</label>
                      <textarea value={weeklyAnswers[prompt] || ""} onChange={(e) => setWeeklyAnswers((prev) => ({ ...prev, [prompt]: e.target.value }))} className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" />
                    </div>
                  ))}
                </div>
                <Button onClick={saveWeeklyReview} className="mt-5 w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Save Weekly Review</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "journal" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3"><PenLine className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Daily Journal</h2><p className="text-sm text-neutral-400">Write the entry here. Past entries live in Stats.</p></div></div>
                <textarea value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder="What happened today? What did you learn? What needs to improve?" className="min-h-72 w-full rounded-3xl border border-white/10 bg-black/30 p-4 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" />
                <Button onClick={saveJournal} className="mt-4 w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Save Entry</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3"><NotebookPen className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Add Review</h2><p className="text-sm text-neutral-400">Log books, restaurants, movies, hotels, or experiences. Saved reviews live in Stats.</p></div></div>
                <input value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} placeholder="Book, restaurant, movie, place..." className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#ff5a00]/60" />
                <div className="mt-3 grid grid-cols-2 gap-3"><select value={reviewType} onChange={(e) => setReviewType(e.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base outline-none"><option>Book</option><option>Restaurant</option><option>Movie</option><option>Hotel</option><option>Experience</option><option>Other</option></select><input type="number" min="1" max="5" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base outline-none" /></div>
                <textarea value={reviewNotes} onChange={(e) => setReviewNotes(e.target.value)} placeholder="What did you think? Would you recommend it? Key takeaway?" className="mt-3 min-h-40 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" />
                <Button onClick={saveReview} className="mt-4 w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Save Review</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "goals" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-2">
            {goalStats.map((goal) => <Card key={goal.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl"><CardContent className="p-6"><div className="mb-4 flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{goal.title}</h2><p className="text-sm text-neutral-400">Target: {goal.target} {goal.unit}</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-sm">{goal.progress}%</span></div><div className="mb-5 h-3 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-gradient-to-r from-white to-[#ff5a00]" style={{ width: `${goal.progress}%` }} /></div><label className="text-sm text-neutral-400">Current</label><input type="number" value={goal.current} onChange={(e) => updateGoal(goal.id, e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#ff5a00]/60" /></CardContent></Card>)}
          </motion.div>
        )}

        {activeTab === "finance" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] text-white shadow-2xl backdrop-blur-xl lg:col-span-3"><CardContent className="p-6"><p className="text-sm text-neutral-400">Current Net Worth</p><h2 className="mt-2 text-5xl font-bold tracking-tight">${totalAssets.toLocaleString()}</h2><p className="mt-2 text-neutral-400">Debt section removed. This is now a clean asset tracker.</p></CardContent></Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-3"><CardContent className="p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-semibold">Assets</h2><Button onClick={addMoneyItem} className="rounded-2xl bg-white px-4 py-2 text-black"><Plus size={16} /></Button></div><div className="grid gap-3 md:grid-cols-2">{assets.map((item) => <div key={item.id} className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-black/25 p-3"><input value={item.name} onChange={(e) => updateMoneyName(item.id, e.target.value)} className="rounded-xl bg-transparent px-2 outline-none" /><input type="number" value={item.value} onChange={(e) => updateMoneyItem(item.id, e.target.value)} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-right outline-none focus:border-[#ff5a00]/60" /></div>)}</div></CardContent></Card>
          </motion.div>
        )}

        {activeTab === "calories" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] text-white shadow-2xl backdrop-blur-xl lg:col-span-3"><CardContent className="p-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-[#ff5a00]"><Wand2 size={14} /> Free smart macro estimate</div><h2 className="text-4xl font-bold">{caloriesLeft} calories left</h2><p className="mt-2 text-neutral-400">Daily limit: {calorieLimit} · Eaten: {nutritionTotals.calories} · Protein left: {proteinLeft}g</p><div className="mt-5 space-y-3"><div><div className="mb-1 flex justify-between text-xs text-neutral-400"><span>Calories</span><span>{calorieProgress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-white" style={{ width: `${calorieProgress}%` }} /></div></div><div><div className="mb-1 flex justify-between text-xs text-neutral-400"><span>Protein</span><span>{proteinProgress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-[#ff5a00]" style={{ width: `${proteinProgress}%` }} /></div></div></div></div><div className="grid grid-cols-3 gap-3 text-center sm:min-w-96"><div className="rounded-2xl bg-black/30 p-4"><Beef className="mx-auto mb-2 text-neutral-400" size={18} /><p className="text-2xl font-bold">{nutritionTotals.protein}g</p><p className="text-xs text-neutral-500">Protein</p></div><div className="rounded-2xl bg-black/30 p-4"><Utensils className="mx-auto mb-2 text-neutral-400" size={18} /><p className="text-2xl font-bold">{nutritionTotals.carbs}g</p><p className="text-xs text-neutral-500">Carbs</p></div><div className="rounded-2xl bg-black/30 p-4"><Scale className="mx-auto mb-2 text-neutral-400" size={18} /><p className="text-2xl font-bold">{nutritionTotals.fat}g</p><p className="text-xs text-neutral-500">Fat</p></div></div></div></CardContent></Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-2"><CardContent className="p-6"><h2 className="text-2xl font-semibold">Log a Meal</h2><p className="mt-1 text-sm text-neutral-400">Type basics naturally: “2 eggs oats banana”, “chicken rice broccoli”, or “large steak potato”.</p><div className="mt-4 flex flex-col gap-3 sm:flex-row"><input value={mealText} onChange={(e) => setMealText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addMeal()} placeholder="Enter meal..." className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#ff5a00]/60" /><Button onClick={addMeal} className="w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Estimate + Add</Button></div><div className="mt-4 flex flex-wrap gap-2">{quickMeals.map((meal) => <button key={meal} onClick={() => addMealFromText(meal)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-neutral-300 hover:bg-white/10 hover:text-white">{meal}</button>)}</div><div className="mt-5 space-y-3">{meals.map((meal) => <div key={meal.id} className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{meal.name}</p><p className="mt-1 text-sm text-neutral-400">{meal.protein}g protein · {meal.carbs}g carbs · {meal.fat}g fat</p>{meal.items && <p className="mt-1 text-xs text-neutral-600">Matched: {meal.items.join(", ")}</p>}</div><div className="flex items-center gap-3"><p className="text-xl font-bold">{meal.calories}</p><button onClick={() => setMeals((prev) => prev.filter((m) => m.id !== meal.id))} className="text-neutral-500 hover:text-white"><Trash2 size={16} /></button></div></div></div>)}</div></CardContent></Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl"><CardContent className="p-6"><h2 className="text-2xl font-semibold">Targets</h2><label className="mt-5 block text-xs text-neutral-500">Calories</label><input type="number" value={calorieLimit} onChange={(e) => setCalorieLimit(Number(e.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-2xl font-bold outline-none focus:border-[#ff5a00]/60" /><label className="mt-4 block text-xs text-neutral-500">Protein Goal</label><input type="number" value={proteinTarget} onChange={(e) => setProteinTarget(Number(e.target.value))} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-2xl font-bold outline-none focus:border-[#ff5a00]/60" /><div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4"><div className="flex items-center justify-between"><div><p className="font-semibold">Water</p><p className="text-sm text-neutral-500">{waterLeft} oz left</p></div><Droplets className="text-[#ff5a00]" /></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-black/40"><div className="h-full rounded-full bg-[#ff5a00]" style={{ width: `${waterProgress}%` }} /></div><div className="mt-3 flex gap-2"><Button onClick={() => setWaterDrank((v) => Math.max(0, v - 16))} className="rounded-xl bg-white/10 px-3 py-2 text-white">-16</Button><Button onClick={() => setWaterDrank((v) => v + 16)} className="rounded-xl bg-white px-3 py-2 text-black">+16 oz</Button></div></div></CardContent></Card>
          </motion.div>
        )}

        {activeTab === "charter" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3"><Plane className="text-[#ff5a00]" /><h2 className="text-2xl font-semibold">Add Charter Note</h2></div>
                <input value={newCharterTitle} onChange={(e) => setNewCharterTitle(e.target.value)} placeholder="Title..." className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-[#ff5a00]/60" />
                <textarea value={newCharterBody} onChange={(e) => setNewCharterBody(e.target.value)} placeholder="Script, checklist, talking point, pricing note..." className="mt-3 min-h-40 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" />
                <Button onClick={addCharterNote} className="mt-4 w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Save Note</Button>
              </CardContent>
            </Card>
            <div className="grid gap-4 lg:col-span-2 md:grid-cols-2">
              {charterNotes.map((note) => (
                <Card key={note.id} className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">{note.category}</span><button onClick={() => setCharterNotes((prev) => prev.filter((item) => item.id !== note.id))} className="text-neutral-500 hover:text-white"><Trash2 size={16} /></button></div>
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="mt-4 whitespace-pre-line text-sm leading-6 text-neutral-300">{note.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ff5a00]/10 px-3 py-1 text-xs text-white"><BarChart3 size={14} /> Progress Hub</div>
                    <h2 className="text-4xl font-bold tracking-tight">Your Work</h2>
                    <p className="mt-2 text-sm text-neutral-400">Streaks, XP, money, journal entries, reviews, meals, missions, and weekly reviews in one place.</p>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 bg-black/30 p-5 text-center">
                    <p className="text-sm text-neutral-400">Current Level</p>
                    <p className="mt-1 text-5xl font-black text-[#ff5a00]">{level}</p>
                    <p className="mt-1 text-xs text-neutral-500">{totalXpToday} XP today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Active Streak", value: `${streak}d`, sub: "days with action", icon: Flame },
                { label: "Net Worth", value: `$${totalAssets.toLocaleString()}`, sub: "assets tracked", icon: Wallet },
                { label: "Journal Entries", value: statsData.totalJournalEntries, sub: "saved entries", icon: PenLine },
                { label: "Reviews", value: statsData.totalReviews, sub: `${statsData.averageReview}/5 avg rating`, icon: Star },
                { label: "Habit Wins", value: statsData.totalHabitCompletions, sub: "non-negotiables checked", icon: CheckCircle2 },
                { label: "Routine Wins", value: statsData.totalRoutineCompletions, sub: "morning/night checks", icon: Sun },
                { label: "Mission Wins", value: statsData.totalMissionCompletions, sub: "tasks completed", icon: Swords },
                { label: "Meals Logged", value: statsData.totalMealsLogged, sub: "food entries", icon: Utensils },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between text-neutral-400"><p className="text-sm">{item.label}</p><Icon size={18} /></div>
                      <p className="mt-3 text-3xl font-bold tracking-tight">{item.value}</p>
                      <p className="mt-1 text-sm text-neutral-400">{item.sub}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-2">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3"><Eye className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Recent Journal Entries</h2><p className="text-sm text-neutral-400">Your latest saved thoughts.</p></div></div>
                  <div className="space-y-3">
                    {journalEntries.length ? journalEntries.slice(0, 6).map((entry) => (
                      <div key={entry.id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-neutral-500">{entry.date}</p>
                        <p className="mt-2 text-sm leading-6 text-neutral-300">{entry.text}</p>
                      </div>
                    )) : <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-center"><PenLine className="mx-auto mb-2 text-neutral-500" /><p className="text-sm text-neutral-400">No journal entries yet.</p><button onClick={() => setActiveTab("journal")} className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">Start first entry</button></div>}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3"><Wallet className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Money Snapshot</h2><p className="text-sm text-neutral-400">Asset tracker summary.</p></div></div>
                  <p className="text-5xl font-bold">${totalAssets.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-neutral-400">Current net worth / assets tracked</p>
                  <div className="mt-5 space-y-2">
                    {assets.slice(0, 6).map((asset) => (
                      <div key={asset.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
                        <span className="text-neutral-300">{asset.name}</span>
                        <span className="font-semibold">${Number(asset.value || 0).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3"><Star className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Review Library</h2><p className="text-sm text-neutral-400">Books, restaurants, places, and experiences you saved.</p></div></div>
                  <div className="space-y-3">
                    {reviews.length ? reviews.map((review) => (
                      <div key={review.id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3"><span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">{review.type}</span><span className="text-sm text-[#ff5a00]">★ {review.rating}/5</span></div>
                        <h3 className="font-semibold">{review.title}</h3>
                        <p className="mt-1 text-xs text-neutral-500">{review.date}</p>
                        <p className="mt-3 text-sm leading-6 text-neutral-300">{review.notes}</p>
                      </div>
                    )) : <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-center"><Star className="mx-auto mb-2 text-neutral-500" /><p className="text-sm text-neutral-400">No reviews saved yet.</p><button onClick={() => setActiveTab("reviews")} className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">Add first review</button></div>}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3"><CheckSquare className="text-[#ff5a00]" /><div><h2 className="text-2xl font-semibold">Weekly Review History</h2><p className="text-sm text-neutral-400">Your saved weekly check-ins.</p></div></div>
                  <div className="space-y-3">
                    {weeklyReviews.length ? weeklyReviews.map((review) => (
                      <div key={review.id} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-neutral-500">{review.date}</p>
                        <div className="mt-3 space-y-3">
                          {Object.entries(review.answers || {}).map(([question, answer]) => (
                            <div key={question}>
                              <p className="text-xs font-semibold text-neutral-400">{question}</p>
                              <p className="mt-1 text-sm leading-6 text-neutral-300">{answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )) : <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5 text-center"><CheckSquare className="mx-auto mb-2 text-neutral-500" /><p className="text-sm text-neutral-400">No weekly reviews saved yet.</p><button onClick={() => setActiveTab("weekly")} className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">Start weekly review</button></div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "export" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <Download className="mb-4 text-[#ff5a00]" size={32} />
                <h2 className="text-2xl font-semibold">Export Backup</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-300">Best option: download a JSON backup. It keeps your people, journal, reviews, meals, routines, assets, goals, and charter notes in one file you can store in iCloud, Google Drive, or GitHub.</p>
                <Button onClick={exportData} className="mt-5 rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200">Download JSON Backup</Button>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <FileText className="mb-4 text-[#ff5a00]" size={32} />
                <h2 className="text-2xl font-semibold">Copy Backup Text</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-300">Use this if download is blocked on mobile. It copies the core data so you can paste it into Notes, a text file, or send it to yourself.</p>
                <Button onClick={copyBackup} className="mt-5 rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200">Copy Backup</Button>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.05] text-white shadow-2xl backdrop-blur-xl lg:col-span-2">
              <CardContent className="p-6">
                <Upload className="mb-4 text-[#ff5a00]" size={32} />
                <h2 className="text-2xl font-semibold">Import / Restore Backup</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-300">Paste the JSON backup you exported earlier. This restores your saved app data into this browser.</p>
                <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste JSON backup here..." className="mt-4 min-h-52 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-base outline-none focus:border-[#ff5a00]/60 sm:text-sm" />
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Button onClick={importData} className="w-full rounded-2xl bg-white px-5 py-3 text-black hover:bg-neutral-200 sm:w-auto">Import Backup</Button>
                  {importStatus && <p className="text-sm text-neutral-300">{importStatus}</p>}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-start gap-3"><RefreshCcw className="mt-1 text-[#ff5a00]" size={18} /><div><h3 className="font-semibold text-white">Reset Today</h3><p className="mt-1 text-sm leading-6 text-neutral-300">Clears today’s non-negotiables, routine checks, mission checks, and current mission result. It does not delete journal entries, people, money, goals, reviews, or backups.</p><Button onClick={resetToday} className="mt-4 w-full rounded-2xl bg-[#ff5a00] px-5 py-3 font-semibold text-white hover:bg-[#ff5a00] sm:w-auto">Reset Today</Button></div></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
