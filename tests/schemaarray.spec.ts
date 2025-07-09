import { N8NPropertiesBuilder } from "../src/N8NPropertiesBuilder";
import { INodeProperties } from "n8n-workflow";

test("petstore.json", () => {
  const doc = require("./samples/schemaarray.json");
  const config = {};
  const parser = new N8NPropertiesBuilder(doc, config);
  const result = parser.build();

  const expected: INodeProperties[] = [
    {
      displayName: "Resource",
      name: "resource",
      type: "options",
      noDataExpression: true,
      options: [{ name: "Default", value: "Default", description: "" }],
      default: "",
    },
    {
      displayName: "Operation",
      name: "operation",
      type: "options",
      noDataExpression: true,
      displayOptions: { show: { resource: ["Default"] } },
      options: [
        {
          name: "POST /foo",
          value: "POST -foo",
          action: "POST /foo",
          description: "",
          routing: { request: { method: "POST", url: "=/foo" } },
        },
      ],
      default: "",
    },
    {
      displayName: "POST /foo",
      name: "operation",
      type: "notice",
      typeOptions: { theme: "info" },
      default: "",
      displayOptions: {
        show: { resource: ["Default"], operation: ["POST /foo"] },
      },
    },
    {
      displayName: "Body",
      name: "body",
      type: "json",
      default: "[{\n  \"name\": \"test_example\",\n  \"value\": 42\n}]",
      description: undefined,
      routing: { request: { body: "={{ JSON.parse($value) }}" } },
      displayOptions: {
        show: { resource: ["Default"], operation: ["POST /foo"] },
      },
    },
  ];
  expect(result).toEqual(expected);
});
