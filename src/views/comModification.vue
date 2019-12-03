<!--商品批量修改-->
<template>
  <div class="comModification">
    <div>
      <h1>根据商品关键词</h1>
      <div class="tab_title">
        <i-Input type="text" placeholder="请输入商品关键词" style="width:200px;margin-top:20px;"></i-Input>
        <i-button type="ghost" style="color:#000;margin-left:20px;margin-top:20px;">搜索</i-button>
        <br />
      </div>
      <div class="Gname">
        <Table :columns="columns1" :data="goodsName" class="tab"></Table>
        <p>已选10件商品</p>
      </div>
      <RadioGroup v-model="animal" style="margin-top:20px;">
        <Radio label="啄个编辑"></Radio>
        <Radio label="URl链接"></Radio>
      </RadioGroup>
      <br />
      <i-Button :to="{path:'/3_1_3'}" style="margin-top:20px;">进入编辑</i-Button>
    </div>

    <div style="margin-top:40px;">
      <h1 style="margin-bottom: 1.5rem;">根据商品编号</h1>
      <p style="margin-bottom: 1.5rem;">请输入商品编号（每行只能输入一个编号）</p>
      <div>
        <Table :columns="columns2" :data="number" class="tab"></Table>
        <p>已选10件商品</p>
      </div>
      <RadioGroup v-model="animal" style="margin-top:20px;">
        <Radio label="啄个编辑"></Radio>
        <Radio label="URl链接"></Radio>
      </RadioGroup>
      <br />
      <i-Button :to="{path:'/3_1_4'}" style="margin-top:20px;">进入编辑</i-Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      to: {
        path: "/3_1_3"
      },
      to: {
        path: "/3_1_4"
      },
      animal: "啄个编辑",
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "goodsname",
          align: "center"
        }
      ],
      goodsName: [
        {
          goodsname: "USERNAME"
        }
      ],
      columns2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品编号",
          key: "number",
          align: "center"
        }
      ],
      number: [
        {
          number: "123456789"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.tab_title {
  margin-bottom: 1.5rem;
}
.tab {
  width: 500px;
}
</style>