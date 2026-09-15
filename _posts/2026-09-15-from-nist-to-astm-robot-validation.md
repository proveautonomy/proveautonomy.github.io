---
layout: post
math: true
title: "從 NIST 到 ASTM：如何建立一套自主移動機器人的驗測方法？"
date: 2026-09-15
author: ProveAutonomy
description: "從 NIST 與 ASTM 的角色出發，整理自主移動機器人驗測的核心概念，並提出 ProveAutonomy Validation Loop。"
categories:
  - Robot Validation
tags:
  - NIST
  - ASTM
  - Robot Testing
  - Autonomous Systems
  - ROS2
  - Sim-to-Real
---

> **Test. Measure. Prove Autonomy.**

自主移動機器人能夠從 A 點走到 B 點，就代表它已經具備可靠的自主能力嗎？

答案通常是否定的。

在實際場域中，一套自主移動系統可能會面對不同的地面材質、坡度、障礙物、光照、通訊品質、定位誤差與感測器干擾。即使機器人在展示或單次測試中順利完成任務，也不代表它能夠在不同條件下持續、穩定且可重現地完成相同任務。

因此，相較於單純問：

> 「機器人能不能跑？」

更重要的問題應該是：

> **「我們要如何證明它真的能跑，而且知道它能跑到什麼程度？」**

這正是 Robot Validation，也就是機器人驗測，真正想解決的問題。

---

## 為什麼自主機器人需要驗測？

假設今天有兩台 AMR，都能完成一段自主導航。

Robot A 成功完成 10 次中的 9 次。  
Robot B 成功完成 10 次中的 10 次。

光看這個結果，我們可能會認為 Robot B 比較好。

但如果進一步詢問：

- 兩台機器人的定位誤差是多少？
- 路徑長度是否一致？
- 遇到動態障礙物時表現如何？
- 換成碎石或草地後還能完成任務嗎？
- 光照改變是否會影響感知系統？
- GNSS 訊號變差時是否還能正常定位？
- 測試 100 次之後結果是否仍然一致？

問題就開始變得複雜。

因此，一套完整的自主系統驗證方法至少應具備以下特性：

### 可量測（Measurable）

結果不能只依靠「感覺還不錯」，而是需要有數據，例如：

- Localization RMSE
- Navigation Success Rate
- Path Length
- Completion Time
- Recovery Time
- Collision Count

### 可重複（Repeatable）

相同條件下重新測試，應該能得到具有一致性的結果。

### 可比較（Comparable）

不同機器人、不同軟體版本或不同導航演算法，應該能在相同條件下比較。

### 可追溯（Traceable）

必須知道測試是在什麼環境、使用什麼參數，以及什麼軟硬體版本下完成。

如果沒有這些條件，「機器人成功完成任務」其實很難成為可靠的工程證據。

---

## NIST 在機器人驗測領域做什麼？

NIST，全名為 **National Institute of Standards and Technology**，長期投入機器人性能評估所需要的量測方法與測試基礎設施。

以 Response Robot 為例，NIST 發展了一系列 Standard Test Methods，用來量化地面、空中與水域機器人的不同能力，包括：

- Mobility
- Manipulation
- Sensors
- Communications
- Energy
- Human-System Interaction
- Logistics
- Safety

對地面機器人而言，常見測試內容包括：

- Ramp
- Stairs
- Stepfield
- Gravel
- Sand
- Confined Area
- Sustained Speed

這裡有一個很重要的觀念：

> **標準測試場不是在模擬所有真實世界，而是在建立一把可以重複使用的「尺」。**

如果每家公司都自己找一片碎石地、自己決定坡度、自己決定成功標準，那麼不同機器人的測試結果就很難比較。

標準化測試的價值，就是讓大家使用相對一致的：

> **Test Apparatus + Procedure + Metric**

來量化能力。

---

## ASTM 又扮演什麼角色？

ASTM International 是國際標準制定組織。

在 Response Robot 領域，NIST 長期參與許多測試方法的研究、驗證與發展，而其中成熟的方法，則可透過 ASTM International 的標準制定程序形成正式的 Standard Test Methods。

例如常見的相關標準包含：

- ASTM E2826：Continuous Pitch/Roll Ramps
- ASTM E2827：Crossing Pitch/Roll Ramps
- ASTM E2828：Symmetric Stepfields
- ASTM E2991：Gravel
- ASTM E2829：Sustained Speed

比較精確的理解，不是簡單地說：

> NIST = 研究  
> ASTM = 發布

而是：

> **NIST 參與測試方法、量測技術與實驗設計的發展與驗證；ASTM 則提供正式的共識標準制定機制，使成熟的方法形成可被廣泛採用的標準。**

可以把這個過程理解為：

```text
Research
   ↓
Validation
   ↓
Standardization
   ↓
Application
```

---

## 以 ASTM E2828 Stepfield 為例

ASTM E2828 Symmetric Stepfields 所使用的 Stepfield，是一種人工建立、可重複製作的複雜地形。

它的目的不是單純把幾塊木板隨機放在地上，而是利用結構化、可重現的幾何地形，量化機器人穿越不規則地面的能力。

如果我們只是說：

> 「Robot A 可以走過崎嶇地形。」

這句話沒有太大的工程意義。

但如果我們可以說：

> Robot A 在指定等級的 Stepfield 中，依照一致的測試程序完成多次測試，並取得一定的完成率與通過速度。

這就開始變成可以比較的工程數據。

這也是 **Validation 和 Demo 最大的差別**。

---

## 從「標準」轉成真正可以執行的測試

閱讀 ASTM 或 NIST 文件本身並不是最困難的部分。

真正困難的是：

> **怎麼把標準轉換成自己的 Robot Validation Plan？**

我目前會先拆成以下幾個步驟。

### 1. Define Capability

首先定義真正想驗證的能力。

例如：

**Mobility**
- 坡度
- Rough Terrain
- Stepfield
- Gravel

**Navigation**
- Point-to-Point Navigation
- Narrow Passage
- Obstacle Avoidance
- Dynamic Obstacle

**Localization**
- Position Accuracy
- Heading Accuracy
- Repeatability
- Localization Recovery

不要一開始就問：

> 「我要買什麼測試設備？」

而應該先問：

> **「我要證明機器人的什麼能力？」**

---

### 2. Define Test Scenario

接著才把能力轉成實際測試場景。

例如要驗證 Outdoor Navigation，可以設計：

```text
Start
  ↓
Asphalt
  ↓
Grass
  ↓
Gravel
  ↓
Slope
  ↓
Narrow Passage
  ↓
Dynamic Obstacle
  ↓
Goal
```

但每一個場景都應該盡量控制變因。

否則一次加入太多因素，即使測試失敗，也很難知道真正原因。

---

## Ground Truth 是驗測裡非常重要的一環

很多 Robot Demo 只有 Robot Data，卻沒有 Ground Truth。

例如 ROS 2 裡可以取得：

```text
/odom
/amcl_pose
/tf
```

但這些資料基本上仍然來自機器人自己的估測。

如果我們想驗證 Localization Accuracy，就必須知道：

> **機器人的真實位置到底在哪裡？**

因此可能需要：

- Motion Capture
- RTK GNSS
- Total Station
- Laser Tracker
- AprilTag / Vision System
- 精密量測基準

取決於不同的測試環境與精度需求。

假設真值位置為 $$(x_t, y_t)$$，機器人估測位置為 $$(\hat{x}_t, \hat{y}_t)$$，則單點位置誤差可表示為：

$$
e_t = \sqrt{(x_t-\hat{x}_t)^2+(y_t-\hat{y}_t)^2}
$$

進一步可計算：

$$
RMSE = \sqrt{\frac{1}{N}\sum_{t=1}^{N} e_t^2}
$$

這時我們討論的就不再是：

> 「AMCL 看起來滿準。」

而是：

> **「這套 Localization System 在此測試條件下的 RMSE 是多少？」**

這就是量化。

---

## Metric 比單純的 Pass / Fail 更重要

很多驗收規格只有：

```text
PASS
FAIL
```

但在研發階段，只看 Pass / Fail 其實非常可惜。

假設 Requirement 是：

> Robot 必須在 5 分鐘內完成導航。

Robot A：

```text
4:59
PASS
```

Robot B：

```text
2:10
PASS
```

如果只留下 Pass / Fail，兩台機器人的結果完全相同。

但真正的性能卻差很多。

因此，一套完整 Robot Evaluation 至少應該保留：

| Capability | Metric |
|---|---|
| Localization | RMSE |
| Navigation | Success Rate |
| Path Planning | Path Efficiency |
| Mobility | Completion Rate |
| Obstacle Avoidance | Collision / Intervention |
| Recovery | Recovery Time |
| Repeatability | Variance / Standard Deviation |
| Mission | Completion Time |

比較合理的流程應該是：

```text
Measurement
    ↓
Metric
    ↓
Requirement
    ↓
Pass / Fail
```

而不是一開始就只剩 Pass / Fail。

---

## ProveAutonomy Validation Loop

如果把前面的概念整理成一個簡單框架，我目前會把自主系統的驗測流程整理為：

![ProveAutonomy Validation Loop](/assets/images/proveautonomy-validation-loop.png)

> **Requirement → Capability → Test Scenario → Ground Truth → Robot Execution → Data Collection → Metric → Analysis → Validation**

這也是我希望 **ProveAutonomy** 持續討論的核心。

自主系統驗證不應該只是：

> 「機器人成功跑完。」

而應該是一套能回答以下問題的方法：

### What are we testing?

我們到底在驗證什麼能力？

### How are we testing it?

測試環境與程序是否可重現？

### What are we measuring?

我們記錄了哪些數據？

### Compared with what?

Ground Truth 或 Reference 是什麼？

### How good is good enough?

什麼性能才叫做符合需求？

---

## 從 Real World 延伸到 Simulation

實體測試非常重要，但也有明顯缺點：

- 成本高
- 建置時間長
- 某些情境危險
- 測試條件難以完全重現
- 大量測試耗費時間
- 極端情境很難建立

因此，Simulation 可以成為 Robot Validation Pipeline 的另一個重要工具。

例如利用：

- NVIDIA Isaac Sim
- ROS 2
- Nav2

先建立：

```text
Test Scenario
    ↓
Simulation
    ↓
Metrics
```

之後再把相同概念移到：

```text
Physical Test Field
    ↓
Real Robot
    ↓
Metrics
```

最後比較：

```text
Simulation Result
        ↕
Real World Result
```

這時 Sim-to-Real 就不只是：

> 「模擬裡可以跑，實機也可以跑。」

而是可以進一步回答：

> **模擬環境的性能結果，究竟能多大程度預測實體機器人的性能？**

這也是 ProveAutonomy 未來想持續深入的方向之一。

---

## 真正要證明的，不是機器人「會動」

自主機器人技術發展得越來越快。

ROS 2、SLAM、Navigation、Deep Learning、Embodied AI、VLA 等技術，都讓建立自主系統變得比以前容易。

但當系統開始走出實驗室，另一個問題會越來越重要：

> **我們如何知道它真的可靠？**

Demo 可以證明：

> **It works.**

Validation 則應該回答：

> **How well does it work?**

更進一步則是：

> **Under what conditions does it work?**

以及：

> **When does it fail?**

這也是我建立 **ProveAutonomy** 想持續探索的問題。

未來這裡會逐步整理：

- Robot Validation
- NIST / ASTM Robot Test Methods
- ROS 2
- Navigation Evaluation
- Localization Evaluation
- Outdoor Robot Testing
- Simulation
- Isaac Sim
- Sim-to-Real
- Autonomous System Benchmarking

希望最終能建立出一套從：

> **Test → Measure → Compare → Validate**

的自主系統驗證方法。

---

## 下一篇

下一篇預計從更實際的角度切入：

> **戶外自主移動機器人測試場，應該測哪些項目？**

會進一步討論地面材質、坡度、定位、GNSS、障礙物、環境條件與測試設備等實際規劃問題。

---

## References

1. NIST, *Performance of Emergency Response Robots*  
   <https://www.nist.gov/programs-projects/performance-emergency-response-robots>

2. NIST, *Standard Test Methods for Response Robots — Ground Robot Tests*  
   <https://www.nist.gov/el/intelligent-systems-division-73500/standard-test-methods-response-robots/ground-robot-tests>

3. NIST, *Stepfield Pallets: Repeatable Terrain for Evaluating Robot Mobility*  
   <https://www.nist.gov/publications/stepfield-pallets-repeatable-terrain-evaluating-robot-mobility>

4. ASTM International, *ASTM E2828 — Standard Test Method for Evaluating Emergency Response Robot Capabilities: Mobility: Confined Area Obstacles: Symmetric Stepfields*  
   <https://www.astm.org/e2828-11.html>

---

**ProveAutonomy**  
*Test. Measure. Prove Autonomy.*
