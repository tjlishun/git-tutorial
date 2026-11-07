/* ==========================================================
   待办清单 · Todo App — 逻辑
   数据持久化：localStorage
   ========================================================== */

(function () {
  'use strict';

  /* ---------- DOM ---------- */
  const $ = (sel) => document.querySelector(sel);

  const input        = $('#input');
  const prioritySel  = $('#priority');
  const addBtn       = $('#add-btn');
  const listEl       = $('#list');
  const emptyEl      = $('#empty');
  const toastEl      = $('#toast');

  const statTotal    = $('#stat-total');
  const statActive   = $('#stat-active');
  const statDone     = $('#stat-done');
  const cAll         = $('#c-all');
  const cActive      = $('#c-active');
  const cDone        = $('#c-done');

  const progressText = $('#progress-text');
  const progressCnt  = $('#progress-count');
  const progressFill = $('#progress-fill');

  const clearDoneBtn = $('#clear-done');
  const clearAllBtn  = $('#clear-all');

  /* ---------- 状态 ---------- */
  const STORAGE_KEY = 'todo-app-items';
  let items = load();
  let filter = 'all';
  let editingId = null;

  /* ---------- 持久化 ---------- */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn('读取本地数据失败：', e);
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('保存本地数据失败：', e);
    }
  }

  /* ---------- 工具 ---------- */
  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const PRIORITY_TEXT = { high: '高', mid: '中', low: '低' };

  function formatTime(ts) {
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- 增删改 ---------- */
  function addItem(text, priority) {
    const item = {
      id: uid(),
      text: text.trim(),
      priority: priority || 'mid',
      done: false,
      createdAt: Date.now()
    };
    items.unshift(item);
    save();
    render();
    toast('✓ 任务已添加');
    return item;
  }

  function toggleItem(id) {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    item.done = !item.done;
    save();
    render();
  }

  function deleteItem(id) {
    items = items.filter((i) => i.id !== id);
    if (editingId === id) editingId = null;
    save();
    render();
    toast('🗑 任务已删除');
  }

  function startEdit(id) {
    editingId = id;
    render();
    const field = listEl.querySelector(`[data-edit="${id}"]`);
    if (field) {
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    }
  }

  function commitEdit(id, value) {
    const item = items.find((i) => i.id === id);
    editingId = null;
    if (item && value.trim()) {
      item.text = value.trim();
      save();
    }
    render();
  }

  function clearDone() {
    const n = items.filter((i) => i.done).length;
    if (!n) { toast('没有已完成的任务'); return; }
    items = items.filter((i) => !i.done);
    save();
    render();
    toast(`已清除 ${n} 条已完成任务`);
  }

  function clearAll() {
    if (!items.length) { toast('列表已经是空的'); return; }
    if (!confirm('确定要清空所有任务吗？此操作不可撤销。')) return;
    items = [];
    save();
    render();
    toast('已清空全部任务');
  }

  /* ---------- 渲染 ---------- */
  function getVisible() {
    if (filter === 'active') return items.filter((i) => !i.done);
    if (filter === 'done') return items.filter((i) => i.done);
    return items;
  }

  function render() {
    const visible = getVisible();

    listEl.innerHTML = visible.map(itemHTML).join('');

    const isEmpty = visible.length === 0;
    emptyEl.classList.toggle('show', isEmpty);
    if (isEmpty) {
      emptyEl.querySelector('h3').textContent =
        items.length === 0 ? '还没有任务' : '该分类下没有任务';
      emptyEl.querySelector('p').textContent =
        items.length === 0 ? '在上面的输入框添加第一条待办吧' : '切换到其他分类看看';
    }

    const total = items.length;
    const done = items.filter((i) => i.done).length;
    const active = total - done;

    statTotal.textContent = total;
    statActive.textContent = active;
    statDone.textContent = done;
    cAll.textContent = total;
    cActive.textContent = active;
    cDone.textContent = done;

    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    progressText.textContent = `完成 ${pct}%`;
    progressCnt.textContent = `${done} / ${total}`;
    progressFill.style.width = pct + '%';
  }

  function itemHTML(item) {
    const isEditing = editingId === item.id;

    const textCell = isEditing
      ? `<input class="item-edit" type="text" value="${escapeHtml(item.text)}" data-edit="${item.id}" maxlength="200">`
      : `<div class="item-text">${escapeHtml(item.text)}</div>`;

    const actions = isEditing
      ? `<button class="icon-btn" data-action="save" title="保存">✓</button>
         <button class="icon-btn" data-action="cancel" title="取消">✕</button>`
      : `<button class="icon-btn" data-action="edit" title="编辑">✎</button>
         <button class="icon-btn del" data-action="delete" title="删除">🗑</button>`;

    return `
      <li class="item ${item.done ? 'done' : ''}" data-id="${item.id}">
        <button class="check" data-action="toggle" title="${item.done ? '标记为未完成' : '标记为完成'}"></button>
        <div class="item-body">
          ${textCell}
          <div class="item-meta">
            <span class="badge ${item.priority}">${PRIORITY_TEXT[item.priority] || '中'}优先级</span>
            <span>${formatTime(item.createdAt)}</span>
          </div>
        </div>
        <div class="actions">${actions}</div>
      </li>
    `;
  }

  /* ---------- 事件 ---------- */

  function submitAdd() {
    const text = input.value.trim();
    if (!text) {
      input.focus();
      toast('请输入任务内容');
      return;
    }
    addItem(text, prioritySel.value);
    input.value = '';
    input.focus();
  }

  addBtn.addEventListener('click', submitAdd);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAdd();
    }
    if (e.key === 'Escape') {
      input.value = '';
      input.blur();
    }
  });

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const id = btn.closest('.item').dataset.id;
    const action = btn.dataset.action;

    if (action === 'toggle') {
      toggleItem(id);
    } else if (action === 'delete') {
      deleteItem(id);
    } else if (action === 'edit') {
      startEdit(id);
    } else if (action === 'save') {
      const field = listEl.querySelector(`[data-edit="${id}"]`);
      commitEdit(id, field ? field.value : '');
    } else if (action === 'cancel') {
      editingId = null;
      render();
    }
  });

  listEl.addEventListener('keydown', (e) => {
    const field = e.target.closest('[data-edit]');
    if (!field) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit(field.dataset.edit, field.value);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      editingId = null;
      render();
    }
  });

  listEl.addEventListener('focusout', (e) => {
    const field = e.target.closest('[data-edit]');
    if (!field) return;
    if (editingId === field.dataset.edit) {
      setTimeout(() => {
        if (editingId === field.dataset.edit) {
          commitEdit(field.dataset.edit, field.value);
        }
      }, 120);
    }
  });

  document.querySelectorAll('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      render();
    });
  });

  clearDoneBtn.addEventListener('click', clearDone);
  clearAllBtn.addEventListener('click', clearAll);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  /* ---------- 初始化 ---------- */
  render();
  input.focus();
})();
