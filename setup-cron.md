# Setting Up Morning Brief to Run Daily at 5:00 AM

## Option 1: Using Cron (Simple)

### Step 1: Test the script manually
```bash
cd /path/to/morning-brief  # Navigate to wherever you cloned the repo
./cron.sh
```

### Step 2: Set up the cron job
```bash
# Open crontab editor
crontab -e
```

### Step 3: Add this line to run at 5:00 AM every day (replace /path/to with your actual path)
```cron
# Morning Brief - Run at 5:00 AM every day
0 5 * * * /path/to/morning-brief/cron.sh >> /path/to/morning-brief/logs/cron.log 2>&1
```

### Step 4: Save and exit
- Press `i` to enter insert mode (if using vim)
- Paste the line above
- Press `Esc`, then type `:wq` and press Enter

### Step 5: Verify cron job is installed
```bash
crontab -l
```

---

## Option 2: Using launchd (Recommended for macOS)

launchd is more reliable on macOS and handles system sleep/wake better than cron.

### Easy Method: Use the installation script
```bash
cd /path/to/morning-brief
./install-launchd.sh
```

The script will automatically:
- Detect the project location
- Generate the correct plist file
- Install and load the job

### Manual Method: Create plist manually
If you prefer to install manually, the template is in `com.morning-brief.daily.plist.template`.
Replace `{{PROJECT_DIR}}` with your actual project path.

### Step 3: Verify it's loaded
```bash
launchctl list | grep morning-brief
```

### Step 4: Test it immediately (optional)
```bash
launchctl start com.morning-brief.daily
```

### Check logs
```bash
tail -f logs/launchd.log  # From project directory
```

---

## Managing the Scheduled Job

### For Cron:
```bash
# View current cron jobs
crontab -l

# Edit cron jobs
crontab -e

# Remove all cron jobs (careful!)
crontab -r
```

### For launchd:
```bash
# Stop the job
launchctl stop com.morning-brief.daily

# Unload the job
launchctl unload ~/Library/LaunchAgents/com.morning-brief.daily.plist

# Reload after editing plist
launchctl unload ~/Library/LaunchAgents/com.morning-brief.daily.plist
launchctl load ~/Library/LaunchAgents/com.morning-brief.daily.plist

# View logs (from project directory)
tail -f logs/launchd.log
```

---

## Timezone Notes

Both cron and launchd use your **system's local timezone**.

To verify your system is set to Pacific Time:
```bash
date +%Z
# Should show "PST" or "PDT"

# If not, set it:
sudo systemsetup -settimezone America/Los_Angeles
```

The job will automatically adjust for Daylight Saving Time.

---

## Troubleshooting

### Cron not running?
1. Make sure script is executable: `chmod +x cron.sh`
2. Check cron logs: `tail -f logs/cron.log`
3. Test script manually: `./cron.sh`

### launchd not running?
1. Check if loaded: `launchctl list | grep morning-brief`
2. View logs: `tail -f logs/launchd.log`
3. Check for errors: `tail -f logs/launchd-error.log`
4. Verify plist syntax: `plutil -lint ~/Library/LaunchAgents/com.morning-brief.daily.plist`
5. Try reinstalling: `./install-launchd.sh`

### Permission issues?
macOS may require Full Disk Access for cron/launchd:
1. Open System Preferences → Security & Privacy → Privacy → Full Disk Access
2. Click the lock to make changes
3. Add `/usr/sbin/cron` (for cron) or `/bin/launchctl` (for launchd)

---

## Viewing Your Briefs

```bash
# From the project directory:

# View today's brief
cat output/morning_brief_$(date +%Y-%m-%d).md

# List all briefs
ls -lh output/

# View with formatting (if you have glow or bat installed)
glow output/morning_brief_$(date +%Y-%m-%d).md
```
