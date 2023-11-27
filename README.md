### todo-list project

## Design pattern
- module pattern

## File structure
```
Project
├── README.md
├── app.js
├── index.html
├── modules
│   ├── formModule.js 
│   ├── htmlModule.js
│   ├── itemModule.js
│   ├── listModule.js
│   └── localStorageModule.js
└── style
    ├── style.css
    ├── style.css.map
    └── style.scss 
```
## Module 
1. formModule.js  
    表單模組：驗證表單、清空表單、送出表單  
2. htmlModule.js  
    HTML模組：新增 HTML 元素  
3. itemModule.js  
    項目模組：產生項目(DOM)、編輯項目、刪除項目、完成項目  
4. listModule.js  
    列表模組：渲染列表、列表排序
5. localStorageModule.js  
    資料模組：操作資料並存入 local storage 
