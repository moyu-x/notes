# 数组

## 14、最长公共子前缀

初始化结果为默认的第一个字符串，对给定的字符串数组进行遍历，每次对字符串中的字符与结果字符串的相同位置进行比较，遇到不同则截断字符串，最后返回（要处理给定字符串数组为空的边界条件）

相当于每次都是当前字符串与结果字符中的字符一一比较

## 122、买卖股票的最佳时机II

最中要的限制就是不能在同一天买入和卖出，所以这个时候在画出每一天的数据的折线图后，就有以下解决办法：

### 方法一 连续递增的端点

此方法认为在递增段上获取利润，所以这个时候只要一次遍历就行，只要遇到增长就计算利润：

```java
for (int i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i -1]) {
        maxprofit += prices[i] - prices[i - 1];
    }
}
```

### 方法二 计算每次波谷和波峰的利润

就是每次先波谷买入，波峰卖出:

```java
for (int i = 0; i < prices.length; i++) {
    // 计算波谷
    while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
        i++;
    }
    int minIndex = i;

    // 计算波峰
    while (i < prices.length - 1 && prices[i] <= prices[i + 1]) {
        i++;
    }
    int maxIndex = i;

    maxprofit += prices[maxIndex] - prices[minIndex];
}
```

## 189、旋转数组

两个前置条件：

1. 数组长度为空或者一的时候直接返回原数组
2. 当移动长度大于数组长度的时候要以数组长度取模`k % nums.length`

### 方法一 反转数组

移动数组k次，相当于将数组尾部的k个元素移动到数组头部，所以方法如下：

1. 反转整个数组
2. 反正0到k个数组元素
3. 反正k后的数组元素

反转数组的代码如下：

```java
public void reverse(int start, int end, int[] nums) {
    for (int i = 0; i < (end - start) / 2; i++) {
        nums[i + start] += nums[end - i - 1];
        nums[end - i - 1] = nums[i + start] - nums[end - i - 1];
        nums[i + start] = nums[i + start] - nums[end -i -1];
    }
}
```

### 方法二 环状替代

直接交换两个元素，当形成环的时候结束，如果还有没有交换过的元素，则偏移后进行下一次循环

```java
int count = 0;
for (int i = 0; count < nums.length; i++) {
    int current = i;
    int prevValue = nums[current];
    do  {
        int prev = (current + k) % nums.length;

        int temp = nums[prev];
        nums[prev] = prevValue;
        prevValue = temp;

        current = prev;
        count++;
    } while (i != current);
}
```

## 350、两数组交集II

### 方法一 构建Map的方式

1. 交换两数组，将长度小的交换的到前面（减少空间）
2. 初始化Map并遍历第一个数组，并统计每个数字出现的频率
3. 遍历第二个数组，并与Map的键值对比，不存在继续；若存在，则输出到第一个数组种，并让下标index偏移

### 方法二 交替遍历

1. 对两个数组进行排序
2. 对两个数组交替进行遍历，遇到相同则记录，核心代码如下

    ```java
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] > nums2[j]) {
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            nums1[k] = nums1[i];
            i++;
            j++;
            k++;
        }
    }
    ```