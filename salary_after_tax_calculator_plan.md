# Salary After-Tax Calculator — Detailed Project Plan

## 1️⃣ Product Definition

### 🎯 Core Promise
“See your real take-home pay instantly, with a clean, fast, no-BS salary after-tax calculator.”

### 🎯 Target Users
- Job seekers comparing offers
- People changing states/countries
- Freelancers checking gross vs net
- Students / first-job users

### 🧩 Core Features (MVP)
**Inputs:**
- Salary amount
- Annual / monthly / hourly toggle
- Country (start with USA or chosen country)
- State (if applicable)
- Filing status
- Pay frequency

**Outputs:**
- Net salary per year / month / pay period
- Total taxes
- Tax breakdown (federal, state, social security, etc.)
- Effective tax rate

**Extras:**
- Explanation section
- Download/Copy results
- Compare two salaries (v2)

---

## 2️⃣ Tech Stack & Architecture

### 🛠 Recommended Stack
- **Next.js** + TypeScript
- **Tailwind CSS** for styling
- **No backend needed** (tax functions run in browser)

### 📁 Folder Structure
- `/pages`
- `/components`
  - SalaryForm
  - ResultsCard
  - TaxBreakdown
  - AdSlot
- `/lib`
  - taxCalculators/
- `/public`
- `/styles`

---

## 3️⃣ UX / UI Design

### Top Layout
**Desktop:** Form left → Results right

**Mobile:** Form → Results stacked

### Form UX
- Clean numeric inputs
- Sliders optional
- Clear labels

### Results UX
- Big bold net salary number
- Tax breakdown list
- Optional bar chart (v2)

---

## 4️⃣ Tax Logic Plan

### Steps
1. Convert salary to annual gross
2. Apply progressive federal tax brackets
3. Add Social Security + Medicare
4. Add state tax (for some states in v1)
5. Sum taxes
6. Net = gross – taxes
7. Convert to monthly, weekly, etc.

### Function Structure
```ts
function calculateNetSalary(params) {
  // returns tax breakdown + net values
}
```

---

## 5️⃣ SEO Strategy

### Primary Keywords
- salary after tax
- take-home pay calculator
- net salary calculator

### On-Page SEO
Below the calculator include a **1,500-word explanation**:
- What the calculator does
- How taxes work
- Examples
- FAQ
- Disclaimer

### Technical SEO
- Structured data (FAQ schema)
- Optimized meta tags
- Country-specific landing pages

---

## 6️⃣ Monetization Plan

### 1. Google AdSense
Placement:
- Below results
- Sticky mobile bottom ad
- Sidebar ad (desktop)

### 2. $3 One-Time Premium
Features:
- No ads
- Save calculations
- Compare salaries
- Export PDF

### 3. Affiliate Links
Recommended niches:
- Tax software
- Budget apps
- Investment platforms

---

## 7️⃣ Content Expansion

### Supporting Pages
- “What is net salary?”
- “Gross vs net explained”
- “50k after tax by state”

### Country Expansion
Each country gets:
- Tax logic file
- Calculator page
- SEO article

---

## 8️⃣ Multilingual Strategy
Start with:
- Spanish
- Portuguese
- German
- French

Use the same tax logic — only text changes.

---

## 9️⃣ Analytics Setup
- Google Analytics 4
- Search Console
- Track events:
  - calculation_done
  - premium_purchased

---

## 🔟 Roadmap

### **Weeks 1–2:** Build MVP
- UI + tax logic
- SEO text
- Deploy

### **Weeks 3–4:** Launch
- AdSense
- Privacy/Terms
- Analytics

### **Month 2:** Growth
- Add 2–3 country calculators
- Supporting pages
- Affiliate integration

### **Month 3:** Expansion
- Multilingual
- Premium version
- More calculators (overtime, hourly → annual, etc.)
