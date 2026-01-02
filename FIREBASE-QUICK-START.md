# 🔥 Firebase Setup - Quick Reference Card

## 📱 Quick Start (5 Minutes)

### 1️⃣ Create Firebase Project
```
1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Name: shramkavach-analytics
4. Enable Google Analytics: YES
5. Click "Create Project"
```

### 2️⃣ Get Your Config
```
1. Click ⚙️ gear icon → Project settings
2. Scroll to "Your apps" → Click </> Web icon
3. App nickname: ShramKavach Website
4. Click "Register app"
5. COPY the firebaseConfig object
```

### 3️⃣ Enable Database
```
1. Left sidebar → "Realtime Database"
2. Click "Create Database"
3. Location: asia-southeast1 (or closest)
4. Security: "Start in test mode"
5. Click "Enable"
```

### 4️⃣ Update Your Code
```bash
# 1. Edit js/firebase-config.js
# Replace YOUR_* placeholders with values from step 2

# 2. Run the upgrade script
./upgrade-to-firebase.sh

# 3. Commit and push
git add -A
git commit -m "Upgrade to Firebase real-time view tracking"
git push
```

### 5️⃣ Secure Database
```
1. Firebase Console → Realtime Database → Rules
2. Paste these rules:
```

```json
{
  "rules": {
    "article_views": {
      "$articleId": {
        ".read": true,
        ".write": "!data.exists() || newData.val() > data.val()",
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    },
    "daily_views": {
      "$date": {
        "$articleId": {
          ".read": true,
          ".write": true,
          ".validate": "newData.isNumber() && newData.val() >= 0"
        }
      }
    }
  }
}
```

```
3. Click "Publish"
```

---

## 🧪 Testing Checklist

### Local Test
- [ ] Open any article page
- [ ] Press F12 → Console tab
- [ ] See: `✓ Firebase initialized successfully`
- [ ] See: `✓ Firebase Realtime Database connected`
- [ ] See: `✓ View tracked: [article-name] = [number]`
- [ ] View counter appears on page

### Firebase Console Test
- [ ] Go to: Firebase Console → Realtime Database → Data
- [ ] See: `article_views` node
- [ ] See your article with a number
- [ ] Refresh page → number increments

### Real-Time Test
- [ ] Open article in 2 browser windows
- [ ] Refresh one window
- [ ] Other window updates instantly ✨

---

## 📊 Firebase Console URLs

| What | URL |
|------|-----|
| **Main Console** | https://console.firebase.google.com/ |
| **Database Data** | Console → Realtime Database → Data |
| **Database Rules** | Console → Realtime Database → Rules |
| **Usage Stats** | Console → Realtime Database → Usage |
| **Project Settings** | Console → ⚙️ gear icon |

---

## 🔧 Common Commands

### Check if Firebase is working
```javascript
// Paste in browser console (F12)
console.log('Firebase:', window.firebaseDB ? '✓ Connected' : '✗ Not loaded');
```

### View all article counts
```javascript
window.firebaseDB.ref('article_views').once('value').then(s => console.log(s.val()));
```

### Manually set a count
```javascript
window.firebaseDB.ref('article_views/UPI-2026').set(5000);
```

### Get top 5 articles
```javascript
window.firebaseDB.ref('article_views')
  .orderByValue()
  .limitToLast(5)
  .once('value')
  .then(s => console.log(s.val()));
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Permission denied" | Update Security Rules (Step 5) |
| "Firebase not defined" | Check `<script>` tags order in HTML |
| Views not saving | Check firebase-config.js credentials |
| Console errors | Check browser DevTools → Console tab |
| Not incrementing | Clear browser cache, hard refresh (Ctrl+Shift+R) |

---

## 📞 Support Links

- **Setup Guide**: See `FIREBASE-SETUP-GUIDE.md`
- **Firebase Docs**: https://firebase.google.com/docs/database
- **Console**: https://console.firebase.google.com/

---

## 💡 Pro Tips

✅ **DO**
- Keep firebase-config.js committed (API keys are safe for web)
- Monitor usage in Firebase Console weekly
- Test in incognito mode to verify real-time sync
- Use Security Rules to prevent abuse

❌ **DON'T**
- Delete the Realtime Database (loses all data!)
- Share your Project ID publicly (it's in the config, it's okay)
- Forget to publish Security Rules

---

**Ready? Start with Step 1! 🚀**

Estimated setup time: **5-10 minutes**
