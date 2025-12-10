
import React, { useState } from 'react';
import { NavItem } from './types';

// Icons
import { 
    LayoutDashboard, Component, MessageSquare, Menu, X, Rocket, Search, CreditCard, 
    User, Mail, Bell, Shield, Settings, CheckCircle, Plus, Trash, Edit, MoreHorizontal,
    Globe, Home, Calendar as CalendarIcon, PieChart, Layers
} from 'lucide-react';

// Core UI
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Select } from './components/ui/Select';
import { Switch } from './components/ui/Switch';
import { Checkbox } from './components/ui/Checkbox';
import { RadioGroup } from './components/ui/Radio';
import { Avatar } from './components/ui/Avatar';
import { Badge } from './components/ui/Badge';
import { Tag } from './components/ui/Tag';
import { Alert } from './components/ui/Alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/Card';
import { Modal } from './components/ui/Modal';
import { Divider } from './components/ui/Divider';
import { AspectRatio } from './components/ui/AspectRatio';
import { Skeleton } from './components/ui/Skeleton';
import { Space } from './components/ui/Space';
import { Breadcrumb, BreadcrumbItem } from './components/ui/Breadcrumb';
import { Pagination } from './components/ui/Pagination';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { Accordion } from './components/ui/Accordion';
import { Textarea } from './components/ui/Textarea';
import { Label } from './components/ui/Label';
import { Slider } from './components/ui/Slider';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from './components/ui/Table';
import { Tooltip } from './components/ui/Tooltip';
import { Popover } from './components/ui/Popover';
import { Progress } from './components/ui/Progress';
import { Calendar } from './components/ui/Calendar';
import { Drawer } from './components/ui/Drawer';
import { Spinner } from './components/ui/Spinner';
import { ToastProvider, useToast } from './components/ui/Toast';

import { DocViewer } from './components/DocViewer';

// Categories following Ant Design Philosophy
// General, Layout, Navigation, Data Entry, Data Display, Feedback
const COMPONENTS: NavItem[] = [
  { id: 'getting-started', label: '开始使用', category: 'getting-started' },
  
  // General (通用)
  { id: 'button', label: 'Button 按钮', category: 'components' }, // Also existing
  { id: 'divider', label: 'Divider 分割线', category: 'components' },
  
  // Layout (布局)
  { id: 'space', label: 'Space 间距', category: 'components' },
  { id: 'aspect-ratio', label: 'AspectRatio 纵横比', category: 'components' },
  { id: 'skeleton', label: 'Skeleton 骨架屏', category: 'components' },
  
  // Navigation (导航)
  { id: 'breadcrumb', label: 'Breadcrumb 面包屑', category: 'components' },
  { id: 'pagination', label: 'Pagination 分页', category: 'components' },
  { id: 'tabs', label: 'Tabs 标签页', category: 'components' },
  { id: 'accordion', label: 'Accordion 折叠面板', category: 'components' },
  
  // Data Entry (数据录入)
  { id: 'input', label: 'Input 输入框', category: 'components' },
  { id: 'textarea', label: 'Textarea 文本域', category: 'components' },
  { id: 'select', label: 'Select 选择器', category: 'components' },
  { id: 'checkbox', label: 'Checkbox 多选框', category: 'components' },
  { id: 'radio', label: 'Radio 单选框', category: 'components' },
  { id: 'switch', label: 'Switch 开关', category: 'components' },
  { id: 'slider', label: 'Slider 滑动输入', category: 'components' },
  { id: 'label', label: 'Label 标签', category: 'components' },
  
  // Data Display (数据展示)
  { id: 'avatar', label: 'Avatar 头像', category: 'components' },
  { id: 'badge', label: 'Badge 徽标', category: 'components' },
  { id: 'tag', label: 'Tag 标签', category: 'components' },
  { id: 'card', label: 'Card 卡片', category: 'components' },
  { id: 'table', label: 'Table 表格', category: 'components' },
  { id: 'tooltip', label: 'Tooltip 文字提示', category: 'components' },
  { id: 'popover', label: 'Popover 气泡卡片', category: 'components' },
  { id: 'progress', label: 'Progress 进度条', category: 'components' },
  { id: 'calendar', label: 'Calendar 日历', category: 'components' },
  
  // Feedback (反馈)
  { id: 'alert', label: 'Alert 警告提示', category: 'components' },
  { id: 'modal', label: 'Modal 对话框', category: 'components' },
  { id: 'drawer', label: 'Drawer 抽屉', category: 'components' },
  { id: 'toast', label: 'Toast 全局提示', category: 'components' },
  { id: 'spinner', label: 'Spinner 加载', category: 'components' },
];

function InnerApp() {
  const [activePage, setActivePage] = useState('getting-started');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  // Demo States
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sliderValue, setSliderValue] = useState(50);
  const [tabValue, setTabValue] = useState('account');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [alertVisible, setAlertVisible] = useState(true);

  // Categorize components for sidebar
  const categories = {
      '通用 (General)': ['button', 'divider'],
      '布局 (Layout)': ['space', 'aspect-ratio', 'skeleton'],
      '导航 (Navigation)': ['breadcrumb', 'pagination', 'tabs', 'accordion'],
      '数据录入 (Data Entry)': ['input', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'slider', 'label'],
      '数据展示 (Data Display)': ['avatar', 'badge', 'tag', 'card', 'table', 'tooltip', 'popover', 'progress', 'calendar'],
      '反馈 (Feedback)': ['alert', 'modal', 'drawer', 'toast', 'spinner'],
  };

  const renderContent = () => {
    switch (activePage) {
      case 'getting-started':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
             <div className="space-y-4 text-center py-10 bg-gradient-to-b from-primary-50 to-transparent rounded-2xl border border-primary-100">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
                        <Rocket className="w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Nebula UI</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    企业级 React 组件库。现已包含 30+ 个常用组件，全面覆盖通用、布局、导航、录入、展示及反馈场景。
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button size="lg" onClick={() => setActivePage('button')}>浏览组件</Button>
                    <Button size="lg" variant="outline" onClick={() => window.open('https://github.com', '_blank')}>GitHub</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                 {Object.entries(categories).map(([cat, items]) => (
                     <Card key={cat} className="hover:border-primary-200 transition-colors">
                         <CardHeader className="pb-2">
                             <CardTitle className="text-base">{cat}</CardTitle>
                         </CardHeader>
                         <CardContent>
                             <p className="text-sm text-slate-500">包含 {items.length} 个组件</p>
                         </CardContent>
                     </Card>
                 ))}
            </div>
          </div>
        );

      // --- GENERAL ---
      case 'button':
        return (
          <DocViewer
            doc={{
              id: 'button',
              title: 'Button 按钮',
              description: '按钮用于开始一个即时操作。',
              usage: `import { Button } from '@/components/ui/Button';

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="outline">描边按钮</Button>
      <Button variant="ghost">幽靈按钮</Button>
      <Button variant="danger">危险按钮</Button>
      
      <Button size="sm">小号</Button>
      <Button isLoading>加载中</Button>
    </div>
  );
}`,
              api: [{ prop: 'variant', type: "string", default: "'primary'", description: '变体样式' }]
            }}
            preview={
              <div className="flex flex-wrap gap-4 items-center justify-center">
                 <Button variant="primary">主要按钮</Button>
                 <Button variant="secondary">次要按钮</Button>
                 <Button variant="outline">描边按钮</Button>
                 <Button variant="ghost">幽靈按钮</Button>
                 <Button variant="danger">危险按钮</Button>
                 <Button size="sm">小号</Button>
                 <Button isLoading>加载中</Button>
              </div>
            }
          />
        );
    case 'divider':
        return (
            <DocViewer
                doc={{
                    id: 'divider',
                    title: 'Divider 分割线',
                    description: '区隔内容的分割线。',
                    usage: `import { Divider } from '@/components/ui/Divider';

export default function DividerDemo() {
  return (
    <div className="w-full max-w-md bg-white p-4 rounded border">
      <p>第一段内容。</p>
      <Divider />
      <p>第二段内容。</p>
      
      <div className="flex h-5 items-center mt-4 border p-2 rounded">
        <span>Blog</span>
        <Divider orientation="vertical" />
        <span>Docs</span>
        <Divider orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}`,
                    api: [{ prop: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '方向' }]
                }}
                preview={
                    <div className="w-full max-w-md">
                        <p>第一段内容。</p>
                        <Divider />
                        <p>第二段内容。</p>
                        <div className="flex h-5 items-center mt-4 border p-2 rounded">
                            <span>Blog</span>
                            <Divider orientation="vertical" />
                            <span>Docs</span>
                            <Divider orientation="vertical" />
                            <span>Source</span>
                        </div>
                    </div>
                }
            />
        );

    // --- LAYOUT ---
    case 'space':
        return (
             <DocViewer
                doc={{
                    id: 'space',
                    title: 'Space 间距',
                    description: '设置组件之间的间距。',
                    usage: `import { Space } from '@/components/ui/Space';
import { Button } from '@/components/ui/Button';

export default function SpaceDemo() {
  return (
    <Space size="lg" wrap>
      <Button>Button 1</Button>
      <Button variant="secondary">Button 2</Button>
      <Button variant="outline">Button 3</Button>
    </Space>
  );
}`,
                    api: [{ prop: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: '间距大小' }]
                }}
                preview={
                    <Space size="lg" wrap>
                        <Button>Button 1</Button>
                        <Button variant="secondary">Button 2</Button>
                        <Button variant="outline">Button 3</Button>
                    </Space>
                }
            />
        );
    case 'aspect-ratio':
        return (
             <DocViewer
                doc={{
                    id: 'aspect-ratio',
                    title: 'AspectRatio 纵横比',
                    description: '保持内容具有指定的纵横比。',
                    usage: `import { AspectRatio } from '@/components/ui/AspectRatio';

export default function AspectRatioDemo() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={16 / 9} className="bg-slate-50">
        <img 
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" 
          alt="Photo" 
          className="rounded-md object-cover h-full w-full" 
        />
      </AspectRatio>
    </div>
  );
}`,
                    api: [{ prop: 'ratio', type: "number", default: "16/9", description: '宽高比' }]
                }}
                preview={
                    <div className="w-[300px]">
                        <AspectRatio ratio={16 / 9} className="bg-slate-50">
                            <img src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80" alt="Photo" className="rounded-md object-cover h-full w-full" />
                        </AspectRatio>
                    </div>
                }
            />
        );
    case 'skeleton':
        return (
             <DocViewer
                doc={{
                    id: 'skeleton',
                    title: 'Skeleton 骨架屏',
                    description: '在需要等待加载内容的位置提供一个占位图形组合。',
                    usage: `import { Skeleton } from '@/components/ui/Skeleton';

export default function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4 w-[300px]">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}`,
                    api: [{ prop: 'className', type: "string", default: "", description: '样式类' }]
                }}
                preview={
                    <div className="flex items-center space-x-4 w-[300px]">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[80%]" />
                        </div>
                    </div>
                }
            />
        );

    // --- NAVIGATION ---
    case 'breadcrumb':
        return (
             <DocViewer
                doc={{
                    id: 'breadcrumb',
                    title: 'Breadcrumb 面包屑',
                    description: '显示当前页面在系统层级结构中的位置。',
                    usage: `import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { Home } from 'lucide-react';

export default function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="#"><Home className="w-4 h-4"/></BreadcrumbItem>
      <BreadcrumbItem href="#">Components</BreadcrumbItem>
      <BreadcrumbItem href="#">Navigation</BreadcrumbItem>
      <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  );
}`,
                    api: []
                }}
                preview={
                     <Breadcrumb>
                        <BreadcrumbItem href="#"><Home className="w-4 h-4"/></BreadcrumbItem>
                        <BreadcrumbItem href="#">Components</BreadcrumbItem>
                        <BreadcrumbItem href="#">Navigation</BreadcrumbItem>
                        <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
                     </Breadcrumb>
                }
            />
        );
    case 'pagination':
        return (
             <DocViewer
                doc={{
                    id: 'pagination',
                    title: 'Pagination 分页',
                    description: '采用分页的形式分隔长列表。',
                    usage: `import { useState } from 'react';
import { Pagination } from '@/components/ui/Pagination';

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination 
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  );
}`,
                    api: [
                        { prop: 'currentPage', type: "number", default: "required", description: '当前页' },
                        { prop: 'totalPages', type: "number", default: "required", description: '总页数' },
                        { prop: 'onPageChange', type: "(page: number) => void", default: "required", description: '页码改变回调' },
                    ]
                }}
                preview={
                     <Pagination 
                        currentPage={currentPage}
                        totalPages={10}
                        onPageChange={setCurrentPage}
                     />
                }
            />
        );
    case 'tabs':
        return (
             <DocViewer
                doc={{
                    id: 'tabs',
                    title: 'Tabs 标签页',
                    description: '在不同的内容区域之间进行切换。',
                    usage: `import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function TabsDemo() {
  const [value, setValue] = useState('account');

  return (
    <Tabs value={value} onValueChange={setValue} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Label>Name</Label>
            <Input defaultValue="Pedro Duarte" />
          </CardContent>
          <CardFooter><Button>Save changes</Button></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader><CardTitle>Password</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" />
          </CardContent>
          <CardFooter><Button>Update password</Button></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}`,
                    api: []
                }}
                preview={
                     <Tabs value={tabValue} onValueChange={setTabValue} className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <Card>
                                <CardHeader><CardTitle>Account</CardTitle></CardHeader>
                                <CardContent className="space-y-2">
                                    <Label>Name</Label>
                                    <Input defaultValue="Pedro Duarte" />
                                </CardContent>
                                <CardFooter><Button>Save changes</Button></CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                             <Card>
                                <CardHeader><CardTitle>Password</CardTitle></CardHeader>
                                <CardContent className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" />
                                    <Label>New Password</Label>
                                    <Input type="password" />
                                </CardContent>
                                <CardFooter><Button>Update password</Button></CardFooter>
                            </Card>
                        </TabsContent>
                     </Tabs>
                }
            />
        );
    case 'accordion':
        return (
             <DocViewer
                doc={{
                    id: 'accordion',
                    title: 'Accordion 折叠面板',
                    description: '可以折叠/展开的内容区域。',
                    usage: `import { Accordion } from '@/components/ui/Accordion';

export default function AccordionDemo() {
  const items = [
    { title: '是否支持无障碍?', content: '是的，完全遵循 WAI-ARIA 设计模式。' },
    { title: '可以自定义样式吗?', content: '可以，基于 Tailwind CSS，覆盖样式非常简单。' },
    { title: '是否收费?', content: '完全开源免费。' }
  ];

  return <Accordion className="w-[300px]" items={items} />;
}`,
                    api: [{ prop: 'items', type: "array", default: "required", description: '内容数组' }]
                }}
                preview={
                     <Accordion 
                        className="w-[300px]"
                        items={[
                            { title: '是否支持无障碍?', content: '是的，完全遵循 WAI-ARIA 设计模式。' },
                            { title: '可以自定义样式吗?', content: '可以，基于 Tailwind CSS，覆盖样式非常简单。' },
                            { title: '是否收费?', content: '完全开源免费。' }
                        ]} 
                     />
                }
            />
        );

    // --- DATA ENTRY ---
    case 'input':
         return (
          <DocViewer
            doc={{ 
                id: 'input', 
                title: 'Input 输入框', 
                description: '基础输入。', 
                usage: `import { Input } from '@/components/ui/Input';

export default function InputDemo() {
  return <Input placeholder="Basic input" />;
}`, 
                api: [] 
            }}
            preview={<Input placeholder="Basic input" />}
          />
        );
    case 'textarea':
        return (
             <DocViewer
                doc={{
                    id: 'textarea',
                    title: 'Textarea 文本域',
                    description: '用于输入多行文本。',
                    usage: `import { Textarea } from '@/components/ui/Textarea';

export default function TextareaDemo() {
  return (
    <div className="w-full max-w-sm">
      <Textarea placeholder="Type your message here." label="Bio" />
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="w-full max-w-sm">
                        <Textarea placeholder="Type your message here." label="Bio" />
                     </div>
                }
            />
        );
    case 'select':
        return (
            <DocViewer
                doc={{ 
                    id: 'select', 
                    title: 'Select 选择器', 
                    description: '下拉选择器。', 
                    usage: `import { Select } from '@/components/ui/Select';

export default function SelectDemo() {
  return (
    <Select 
      options={[
        {value:'1', label:'Option 1'}, 
        {value:'2', label:'Option 2'}
      ]} 
      label="Demo" 
    />
  );
}`, 
                    api: [] 
                }}
                preview={<Select options={[{value:'1', label:'Option 1'}, {value:'2', label:'Option 2'}]} label="Demo" />}
            />
        );
    case 'checkbox':
        return (
            <DocViewer
                doc={{ 
                    id: 'checkbox', 
                    title: 'Checkbox 多选框', 
                    description: '多选。', 
                    usage: `import { Checkbox } from '@/components/ui/Checkbox';

export default function CheckboxDemo() {
  return <Checkbox label="Accept terms" />;
}`, 
                    api: [] 
                }}
                preview={<Checkbox label="Accept terms" />}
            />
        );
    case 'radio':
        return (
            <DocViewer
                doc={{ 
                    id: 'radio', 
                    title: 'Radio 单选框', 
                    description: '单选。', 
                    usage: `import { RadioGroup } from '@/components/ui/Radio';

export default function RadioDemo() {
  return (
    <RadioGroup 
      name="demo-radio" 
      options={[
        {value:'1', label:'One'}, 
        {value:'2', label:'Two'}
      ]} 
      defaultValue="1" 
    />
  );
}`, 
                    api: [] 
                }}
                preview={<RadioGroup name="r1" options={[{value:'1', label:'One'}, {value:'2', label:'Two'}]} value="1" />}
            />
        );
    case 'switch':
        return (
            <DocViewer
                doc={{ 
                    id: 'switch', 
                    title: 'Switch 开关', 
                    description: '开关。', 
                    usage: `import { useState } from 'react';
import { Switch } from '@/components/ui/Switch';

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
}`, 
                    api: [] 
                }}
                preview={<Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />}
            />
        );
    case 'slider':
        return (
             <DocViewer
                doc={{
                    id: 'slider',
                    title: 'Slider 滑动输入条',
                    description: '滑动型输入器，展示当前值和可选范围。',
                    usage: `import { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import { Label } from '@/components/ui/Label';

export default function SliderDemo() {
  const [val, setVal] = useState(50);
  
  return (
    <div className="w-[300px] space-y-4">
      <Label>Volume: {val}%</Label>
      <Slider 
        value={val} 
        onValueChange={setVal} 
        max={100} 
        step={1} 
      />
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="w-[300px] space-y-4">
                        <Label>Volume: {sliderValue}%</Label>
                        <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                     </div>
                }
            />
        );
    case 'label':
         return (
             <DocViewer
                doc={{
                    id: 'label',
                    title: 'Label 标签',
                    description: '文本标签。',
                    usage: `import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

export default function LabelDemo() {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="email" required>Email</Label>
      <Input id="email" placeholder="Email" />
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="grid gap-1.5">
                        <Label htmlFor="email" required>Email</Label>
                        <Input id="email" placeholder="Email" />
                     </div>
                }
            />
        );

    // --- DATA DISPLAY ---
    case 'avatar':
         return (
            <DocViewer
                doc={{ 
                    id: 'avatar', 
                    title: 'Avatar 头像', 
                    description: '头像。', 
                    usage: `import { Avatar } from '@/components/ui/Avatar';

export default function AvatarDemo() {
  return <Avatar fallback="CN" />;
}`, 
                    api: [] 
                }}
                preview={<Avatar fallback="CN" />}
            />
        );
    case 'badge':
         return (
            <DocViewer
                doc={{ 
                    id: 'badge', 
                    title: 'Badge 徽标', 
                    description: '徽标。', 
                    usage: `import { Badge } from '@/components/ui/Badge';

export default function BadgeDemo() {
  return <Badge>Badge</Badge>;
}`, 
                    api: [] 
                }}
                preview={<Badge>Badge</Badge>}
            />
        );
    case 'tag':
         return (
            <DocViewer
                doc={{ 
                    id: 'tag', 
                    title: 'Tag 标签', 
                    description: '标签。', 
                    usage: `import { Tag } from '@/components/ui/Tag';

export default function TagDemo() {
  return <Tag variant="blue">Tag</Tag>;
}`, 
                    api: [] 
                }}
                preview={<Tag variant="blue">Tag</Tag>}
            />
        );
    case 'card':
         return (
            <DocViewer
                doc={{ 
                    id: 'card', 
                    title: 'Card 卡片', 
                    description: '通用容器。', 
                    usage: `import { Card } from '@/components/ui/Card';

export default function CardDemo() {
  return (
    <Card className="w-[200px] h-[100px] flex items-center justify-center">
      Card Content
    </Card>
  );
}`, 
                    api: [] 
                }}
                preview={<Card className="w-[200px] h-[100px] flex items-center justify-center">Card Content</Card>}
            />
        );
    case 'table':
        return (
             <DocViewer
                doc={{
                    id: 'table',
                    title: 'Table 表格',
                    description: '展示行列数据。',
                    usage: `import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV-001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV-002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
                    api: []
                }}
                preview={
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV-001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV-002</TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                        </TableBody>
                     </Table>
                }
            />
        );
    case 'tooltip':
        return (
             <DocViewer
                doc={{
                    id: 'tooltip',
                    title: 'Tooltip 文字提示',
                    description: '简单的文字提示气泡框。',
                    usage: `import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { Plus, Trash } from 'lucide-react';

export default function TooltipDemo() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Add to library">
        <Button variant="outline" size="sm"><Plus className="w-4 h-4"/></Button>
      </Tooltip>
      <Tooltip content="Delete item" position="bottom">
        <Button variant="outline" size="sm"><Trash className="w-4 h-4"/></Button>
      </Tooltip>
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="flex gap-4">
                        <Tooltip content="Add to library">
                            <Button variant="outline" size="sm"><Plus className="w-4 h-4"/></Button>
                        </Tooltip>
                         <Tooltip content="Delete item" position="bottom">
                            <Button variant="outline" size="sm"><Trash className="w-4 h-4"/></Button>
                        </Tooltip>
                     </div>
                }
            />
        );
    case 'popover':
        return (
             <DocViewer
                doc={{
                    id: 'popover',
                    title: 'Popover 气泡卡片',
                    description: '点击/鼠标移入元素，弹出气泡式的卡片浮层。',
                    usage: `import { Popover } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

export default function PopoverDemo() {
  const content = (
    <div className="space-y-2">
      <h4 className="font-medium">Dimensions</h4>
      <p className="text-sm text-slate-500">Set the dimensions for the layer.</p>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label>Width</Label>
          <Input defaultValue="100%" className="col-span-2 h-8" />
        </div>
      </div>
    </div>
  );

  return (
    <Popover 
      trigger={<Button variant="outline">Open Popover</Button>}
      content={content}
    />
  );
}`,
                    api: []
                }}
                preview={
                     <Popover 
                        trigger={<Button variant="outline">Open Popover</Button>}
                        content={
                            <div className="space-y-2">
                                <h4 className="font-medium">Dimensions</h4>
                                <p className="text-sm text-slate-500">Set the dimensions for the layer.</p>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label>Width</Label>
                                        <Input defaultValue="100%" className="col-span-2 h-8" />
                                    </div>
                                </div>
                            </div>
                        }
                     />
                }
            />
        );
    case 'progress':
        return (
             <DocViewer
                doc={{
                    id: 'progress',
                    title: 'Progress 进度条',
                    description: '展示操作的当前进度。',
                    usage: `import { Progress } from '@/components/ui/Progress';

export default function ProgressDemo() {
  return (
    <div className="w-[300px] space-y-4">
      <Progress value={33} />
      <Progress value={66} indicatorColor="bg-green-500" />
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="w-[300px] space-y-4">
                        <Progress value={33} />
                        <Progress value={66} indicatorColor="bg-green-500" />
                     </div>
                }
            />
        );
    case 'calendar':
        return (
             <DocViewer
                doc={{
                    id: 'calendar',
                    title: 'Calendar 日历',
                    description: '日历组件，支持日期选择和月份切换。',
                    usage: `import { useState } from 'react';
import { Calendar } from '@/components/ui/Calendar';

export default function CalendarDemo() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col items-center space-y-4">
      <Calendar 
        value={date} 
        onChange={setDate} 
      />
      <p className="text-sm text-slate-500">
        Selected: {date?.toLocaleDateString()}
      </p>
    </div>
  );
}`,
                    api: [
                        { prop: 'value', type: "Date", default: "undefined", description: '当前选中的日期' },
                        { prop: 'onChange', type: "(date: Date) => void", default: "undefined", description: '日期变化回调' },
                    ]
                }}
                preview={
                    <div className="flex flex-col items-center space-y-4">
                        <Calendar 
                            value={date} 
                            onChange={setDate} 
                        />
                        <p className="text-sm text-slate-500">
                            Selected: {date?.toLocaleDateString()}
                        </p>
                    </div>
                }
            />
        );

    // --- FEEDBACK ---
    case 'alert':
         return (
            <DocViewer
                doc={{ 
                    id: 'alert', 
                    title: 'Alert 警告提示', 
                    description: '警告提示。', 
                    usage: `import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

export default function AlertDemo() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Button onClick={() => setVisible(true)}>Show Alert</Button>;
  }

  return (
    <Alert 
      title="Heads up!" 
      onClose={() => setVisible(false)}
    >
      You can add components to your app using the cli.
    </Alert>
  );
}`, 
                    api: [
                        { prop: 'variant', type: "'default'|'destructive'|'success'|'warning'", default: "'default'", description: '样式变体' },
                        { prop: 'title', type: "string", default: "", description: '标题' },
                        { prop: 'icon', type: "boolean", default: "true", description: '是否显示图标' },
                        { prop: 'onClose', type: "() => void", default: "undefined", description: '关闭回调' },
                    ] 
                }}
                preview={
                    alertVisible ? (
                        <Alert title="Heads up!" onClose={() => setAlertVisible(false)}>
                            You can add components to your app using the cli.
                        </Alert>
                    ) : (
                        <Button onClick={() => setAlertVisible(true)}>Reset Alert</Button>
                    )
                }
            />
        );
    case 'modal':
         return (
            <DocViewer
                doc={{ 
                    id: 'modal', 
                    title: 'Modal 对话框', 
                    description: '模态对话框。', 
                    usage: `import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Example"
      >
        Content here.
      </Modal>
    </>
  );
}`, 
                    api: [] 
                }}
                preview={
                    <>
                        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Example">
                            Content here.
                        </Modal>
                    </>
                }
            />
        );
    case 'drawer':
        return (
             <DocViewer
                doc={{
                    id: 'drawer',
                    title: 'Drawer 抽屉',
                    description: '屏幕边缘滑出的浮层面板。',
                    usage: `import { useState } from 'react';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';

export default function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Configuration"
      >
        <div className="p-4 space-y-4">
          <div>
            <Label>Username</Label>
            <Input defaultValue="@peduarte" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Notifications</Label>
            <Switch />
          </div>
          <div className="pt-4">
            <Button className="w-full">Save Changes</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}`,
                    api: []
                }}
                preview={
                    <>
                        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
                        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Configuration">
                             <div className="p-4 space-y-4">
                                <div>
                                    <Label>Username</Label>
                                    <Input defaultValue="@peduarte" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label>Notifications</Label>
                                    <Switch />
                                </div>
                                <div className="pt-4">
                                    <Button className="w-full">Save Changes</Button>
                                </div>
                             </div>
                        </Drawer>
                    </>
                }
            />
        );
    case 'toast':
        return (
             <DocViewer
                doc={{
                    id: 'toast',
                    title: 'Toast 全局提示',
                    description: '全局展示的轻量级反馈信息。',
                    usage: `import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

export default function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => showToast("Added to cart", "success")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => showToast("Something went wrong", "error")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => showToast("New update available")}>
        Info
      </Button>
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="flex gap-2">
                        <Button variant="outline" onClick={() => showToast("Added to cart", "success")}>Success</Button>
                        <Button variant="outline" onClick={() => showToast("Something went wrong", "error")}>Error</Button>
                        <Button variant="outline" onClick={() => showToast("New update available")}>Info</Button>
                     </div>
                }
            />
        );
    case 'spinner':
        return (
             <DocViewer
                doc={{
                    id: 'spinner',
                    title: 'Spinner 加载动画',
                    description: '用于页面和区块的加载中状态。',
                    usage: `import { Spinner } from '@/components/ui/Spinner';

export default function SpinnerDemo() {
  return (
    <div className="flex gap-4 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}`,
                    api: []
                }}
                preview={
                     <div className="flex gap-4 items-center">
                        <Spinner size="sm" />
                        <Spinner size="md" />
                        <Spinner size="lg" />
                     </div>
                }
            />
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
                className="md:hidden p-2 -ml-2 text-slate-500" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                <span className="font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:inline-block">Nebula UI</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                <Search className="w-4 h-4 mr-2" />
                搜索...
             </div>
             <Button variant="ghost" size="sm" onClick={() => setActivePage('getting-started')}>文档</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 pt-8">
        
        {/* Sidebar */}
        <aside className={`
            fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto border-r border-slate-100 pr-6 pb-20
            ${mobileMenuOpen ? '!block bg-white left-0 px-6 pt-6 shadow-xl' : ''}
        `}>
          <div className="space-y-6 pb-10">
            <div>
                 <button
                    onClick={() => { setActivePage('getting-started'); setMobileMenuOpen(false); }}
                    className={`text-left px-2 py-1.5 text-sm font-semibold w-full rounded-md transition-colors ${activePage === 'getting-started' ? 'text-primary-600 bg-primary-50' : 'text-slate-900'}`}
                >
                    开始使用
                </button>
            </div>

            {Object.entries(categories).map(([categoryName, items]) => (
                <div key={categoryName}>
                    <h4 className="font-semibold mb-2 text-xs uppercase tracking-wider text-slate-500">{categoryName}</h4>
                    <div className="flex flex-col space-y-1">
                        {items.map(itemId => {
                            const item = COMPONENTS.find(c => c.id === itemId);
                            if (!item) return null;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActivePage(item.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                                        activePage === item.id 
                                            ? 'bg-primary-50 text-primary-700 font-medium' 
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                >
                                    {item.label.split(' ')[1] || item.label} <span className="text-xs text-slate-400 font-normal ml-1">{item.label.split(' ')[0]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr]">
            {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
    return (
        <ToastProvider>
            <InnerApp />
        </ToastProvider>
    );
}
