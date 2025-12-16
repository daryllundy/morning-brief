# Quick Start Guide - Morning Brief

## 🚀 Quick Setup (3 steps)

### 1. Test the script manually
```bash
cd /path/to/morning-brief  # Navigate to wherever you cloned the repo
./cron.sh
```

### 2. Install the daily schedule
```bash
./install-launchd.sh
```

### 3. Test it runs immediately (optional)
```bash
launchctl start com.morning-brief.daily
```

**That's it!** Your brief will now run automatically every morning at 5:00 AM (local time).

---

## 📖 View Your Briefs

```bash
# View today's brief
cat output/morning_brief_$(date +%Y-%m-%d).md

# List all briefs
ls -lh output/

# Watch logs in real-time
tail -f logs/launchd.log
```

---

## 🛠️ Manage the Scheduled Job

```bash
# Check if it's running
launchctl list | grep morning-brief

# Run it now (test)
launchctl start com.morning-brief.daily

# Stop the schedule
launchctl unload ~/Library/LaunchAgents/com.morning-brief.daily.plist

# Restart the schedule
launchctl load ~/Library/LaunchAgents/com.morning-brief.daily.plist

# View logs
tail -f logs/launchd.log
tail -f logs/launchd-error.log
```

---

## 🔧 Troubleshooting

**Job not running?**
1. Check if loaded: `launchctl list | grep morning-brief`
2. Test manually: `./cron.sh`
3. View error logs: `cat logs/launchd-error.log`

**Need to change the time?**
1. Edit `com.morning-brief.daily.plist` (change Hour/Minute values)
2. Reload: `./install-launchd.sh`

**Uninstall completely:**
```bash
launchctl unload ~/Library/LaunchAgents/com.morning-brief.daily.plist
rm ~/Library/LaunchAgents/com.morning-brief.daily.plist
```

---

For detailed instructions, see `setup-cron.md`
