import Vue from 'vue';
import { 
	Button,
	Input,
	Card,
	Message,
	Table,
	TableColumn,
	Tabs,
	TabPane,
	Descriptions,
	DescriptionsItem,
	Tag,
	Progress,
	Divider,
	DatePicker,
	Form,
	FormItem,
	MessageBox,
	Tooltip
		} from 'element-ui';
Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Progress)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Tooltip)
Vue.prototype.$message = Message;
Vue.prototype.$prompt = MessageBox.prompt;