<!--啄个编辑-->
<template>
  <div class="unifiededitor">
    <h1>编辑商品信息</h1>
    <div>
      <Table
        ref="selection"
        :columns="columns3"
        :data="dataList"
        style="margin-bottom: 20px;width: 350px;"
      ></Table>
      <Table ref="selection" :columns="columns4" :data="newList" style="margin-bottom: 20px;"></Table>
      <Button
        type="primary"
        style="width:200px;display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 18.5rem;"
        @click="handleSubmit('formValidate')"
      >提交</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "single",
      columns4: [
        {
          title: "商品编号",
          key: "id",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.id)
            ]);
          }
        },
        {
          title: "商品名称",
          key: "username",
          align: "center"
        },
        {
          title: "原价价格",
          key: "Y_price",
          render: (h, params) => {
            return h("i-Input", {});
          }
        },
        {
          title: "折扣价格",
          key: "Z_price",
          render: (h, params) => {
            return h("i-Input", {});
          }
        },
        {
          title: "补贴金币",
          key: "money",
          render: (h, params) => {
            return h("i-Input", {});
          }
        },
        {
          title: "库存",
          key: "sku",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("i-Input", {});
          }
        }
      ],
      newList: [
        {
          id: "1",
          username: "小绿篮",
          Y_price: "",
          Z_price: "",
          money: "",
          sku: ""
        }
      ],
      columns3: [
        {
          title: "商品编号",
          key: "id",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.id)
            ]);
          }
        },
        {
          title: "商品名称",
          key: "username",
          align: "center"
        }
      ],
      dataList: [
        {
          id: "1",
          username: "小绿篮"
        }
      ]
    };
  }
};
</script>