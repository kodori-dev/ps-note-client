export const PROBLEMS = [
  {
    id: 0,
    name: '쿠키의 신체 측정',
    boj_id: '20125',
    level: 'ruby_1',
    created_at: '',
    updated_at: '',
    is_solved: true,
    is_starred: true,
    stars: 7,
  },
  {
    id: 1,
    name: '쿠키의 신체 측정',
    boj_id: '20125',
    level: '',
    created_at: '',
    updated_at: '',
    is_solved: true,
    is_starred: true,
    stars: 7,
  },
  {
    id: 2,
    name: '쿠키의 신체 측정',
    boj_id: '20125',
    level: '',
    created_at: '',
    updated_at: '',
    is_solved: false,
    is_starred: true,
    stars: 4,
  },
  {
    id: 3,
    name: '쿠키의 신체 측정',
    boj_id: '20125',
    level: '',
    created_at: '',
    updated_at: '',
    is_solved: true,
    is_starred: true,
    stars: 3,
  },
];

export const SOLUTIONS = [
  {
    id: 1,
    member: 1,
    problem: 1,
    comment: '## 아이디어\n\n\n\n💡 시작지점이 여러개인 위상정렬 ⇒ priority queue 현재 가능한 노드들 싹다 넣어두기\n\n## 코멘트\n\n',
    source_lang: 'c++',
    source_code:
      "#include <stdio.h>\n#include <iostream>\n#include <stdlib.h>\n#include <string.h>\n#include <string>\n#include <algorithm>\n#include <set>\n#include <vector>\n#include <stack>\n#include <queue>\n#include <math.h>\n#include <tuple>\n#include <map>\n#include <bitset>\nusing namespace std;\n#define ll long long\n#define llinf 2e18\n#define intinf 2e9\n\nint n, m;\nvector<int> graph[32005];\nvector<int> in_num(32005);\nvector<bool> visited(32005, false);\npriority_queue<int, vector<int>, greater<int>> pq;\nint main(void) {\n\tcin >> n >> m;\n\tif (n == 1) {\n\t\tcout << 1;\n\t\treturn 0;\n\t}\n\twhile (m--) {\n\t\tint a, b;\n\t\tcin >> a >> b;\n\t\tgraph[a].push_back(b);\n\t\tin_num[b]++;\n\t}\n\tfor (int i = 1; i <= n; i++) {\n\t\tif (!in_num[i]) {\n\t\t\tpq.push(i);\n\t\t\tvisited[i] = true;\n\t\t}\n\t}\n\twhile (!pq.empty()) {\n\t\tint x = pq.top();\n\t\tpq.pop();\n\t\tcout << x << ' ';\n\t\tfor (auto& y : graph[x]) {\n\t\t\tif (!visited[y]) {\n\t\t\t\tin_num[y]--;\n\t\t\t\tif (!in_num[y]) {\n\t\t\t\t\tpq.push(y);\n\t\t\t\t\tvisited[y] = true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n}",
    is_correct_answer: true,
    submitted_at: '2024-04-11',
    imported_from_notion: true,
    is_fully_parsed: false,
    notion_page_id: 'c02e957c-829f-4145-bc8a-5be0e96fa5fc',
    is_boj_verified: true,
    boj_solution_id: '76805745',
    created_at: '2024-08-24T04:01:01.140658+09:00',
    updated_at: '2024-08-24T04:01:01.140697+09:00',
    deleted_at: null,
  },
  {
    id: 2,
    member: 1,
    problem: 1,
    comment: '## 아이디어\n\n\n\n💡 시작지점이 여러개인 위상정렬 ⇒ priority queue 현재 가능한 노드들 싹다 넣어두기\n\n## 코멘트\n\n',
    source_lang: 'c++',
    source_code:
      "#include <stdio.h>\n#include <iostream>\n#include <stdlib.h>\n#include <string.h>\n#include <string>\n#include <algorithm>\n#include <set>\n#include <vector>\n#include <stack>\n#include <queue>\n#include <math.h>\n#include <tuple>\n#include <map>\n#include <bitset>\nusing namespace std;\n#define ll long long\n#define llinf 2e18\n#define intinf 2e9\n\nint n, m;\nvector<int> graph[32005];\nvector<int> in_num(32005);\nvector<bool> visited(32005, false);\npriority_queue<int, vector<int>, greater<int>> pq;\nint main(void) {\n\tcin >> n >> m;\n\tif (n == 1) {\n\t\tcout << 1;\n\t\treturn 0;\n\t}\n\twhile (m--) {\n\t\tint a, b;\n\t\tcin >> a >> b;\n\t\tgraph[a].push_back(b);\n\t\tin_num[b]++;\n\t}\n\tfor (int i = 1; i <= n; i++) {\n\t\tif (!in_num[i]) {\n\t\t\tpq.push(i);\n\t\t\tvisited[i] = true;\n\t\t}\n\t}\n\twhile (!pq.empty()) {\n\t\tint x = pq.top();\n\t\tpq.pop();\n\t\tcout << x << ' ';\n\t\tfor (auto& y : graph[x]) {\n\t\t\tif (!visited[y]) {\n\t\t\t\tin_num[y]--;\n\t\t\t\tif (!in_num[y]) {\n\t\t\t\t\tpq.push(y);\n\t\t\t\t\tvisited[y] = true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n}",
    is_correct_answer: true,
    submitted_at: '2024-04-11',
    imported_from_notion: true,
    is_fully_parsed: false,
    notion_page_id: 'c02e957c-829f-4145-bc8a-5be0e96fa5fc',
    is_boj_verified: true,
    boj_solution_id: '76805745',
    created_at: '2024-08-24T04:01:01.140658+09:00',
    updated_at: '2024-08-24T04:01:01.140697+09:00',
    deleted_at: null,
  },
  {
    id: 3,
    member: 3,
    problem: 1,
    comment: '## 아이디어\n\n\n\n💡 시작지점이 여러개인 위상정렬 ⇒ priority queue 현재 가능한 노드들 싹다 넣어두기\n\n## 코멘트\n\n',
    source_lang: 'c++',
    source_code:
      "#include <stdio.h>\n#include <iostream>\n#include <stdlib.h>\n#include <string.h>\n#include <string>\n#include <algorithm>\n#include <set>\n#include <vector>\n#include <stack>\n#include <queue>\n#include <math.h>\n#include <tuple>\n#include <map>\n#include <bitset>\nusing namespace std;\n#define ll long long\n#define llinf 2e18\n#define intinf 2e9\n\nint n, m;\nvector<int> graph[32005];\nvector<int> in_num(32005);\nvector<bool> visited(32005, false);\npriority_queue<int, vector<int>, greater<int>> pq;\nint main(void) {\n\tcin >> n >> m;\n\tif (n == 1) {\n\t\tcout << 1;\n\t\treturn 0;\n\t}\n\twhile (m--) {\n\t\tint a, b;\n\t\tcin >> a >> b;\n\t\tgraph[a].push_back(b);\n\t\tin_num[b]++;\n\t}\n\tfor (int i = 1; i <= n; i++) {\n\t\tif (!in_num[i]) {\n\t\t\tpq.push(i);\n\t\t\tvisited[i] = true;\n\t\t}\n\t}\n\twhile (!pq.empty()) {\n\t\tint x = pq.top();\n\t\tpq.pop();\n\t\tcout << x << ' ';\n\t\tfor (auto& y : graph[x]) {\n\t\t\tif (!visited[y]) {\n\t\t\t\tin_num[y]--;\n\t\t\t\tif (!in_num[y]) {\n\t\t\t\t\tpq.push(y);\n\t\t\t\t\tvisited[y] = true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n}",
    is_correct_answer: true,
    submitted_at: '2024-04-11',
    imported_from_notion: true,
    is_fully_parsed: false,
    notion_page_id: 'c02e957c-829f-4145-bc8a-5be0e96fa5fc',
    is_boj_verified: true,
    boj_solution_id: '76805745',
    created_at: '2024-08-24T04:01:01.140658+09:00',
    updated_at: '2024-08-24T04:01:01.140697+09:00',
    deleted_at: null,
  },
];