---
layout: default
title: ProveAutonomy
---

# ProveAutonomy

**Test. Measure. Prove Autonomy.**

Engineering notes on:

- Autonomous Systems
- Robot Validation
- ROS 2
- Navigation
- Simulation
- Sim-to-Real
- NIST / ASTM
- Field Testing

---

## Latest Articles

{% for post in site.posts %}

### [{{ post.title }}]({{ post.url | relative_url }})

{{ post.date | date: "%Y-%m-%d" }}

{{ post.excerpt }}

{% endfor %}