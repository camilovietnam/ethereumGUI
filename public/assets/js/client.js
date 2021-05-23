let nodes = [];
let addresses = [];
let balances = [];

const SERVER_URL = "http://localhost:8080";

$(function () {
  $("#btn-add-address").on("click", addNewAddress);
  $("#btn-add-node").on("click", addNewNode);

  $(document).on("click", ".btn-edit-address", openEditAddressModal);
  $(document).on("click", ".btn-transfer", openTransferModal);

  $(document).on("click", ".btn-delete-address", deleteAddressListItem);
  $(document).on("click", ".btn-delete-node", deleteNodeListItem);
  $(document).on("click", ".btn-close-alert", closeAlert);
  $(document).on("click", ".btn-ping-node", pingNode);
  $(document).on("click", ".btn-start-mining", startMining);
  $(document).on("click", ".btn-stop-mining", stopMining);
});

function addNewNode() {
  const newNodeAddress = $("#input-node-address").val();
  const newNodePort = $("#input-node-port").val();

  if (newNodeAddress === "" || newNodePort === "") {
    return;
  }

  nodes.push({ address: newNodeAddress, port: newNodePort });

  rebuildNodeList();

  $("#input-node-address").val("");
  $("#input-node-port").val("");
}

async function addNewAddress() {
  const newAddress = $("#input-address").val();

  if (newAddress === "") {
    return;
  }

  addresses.push(newAddress);

  rebuildAddressList();

  $("#input-address").val("");
}

async function rebuildNodeList() {
  $("ul#list-nodes li").remove();
  $("ul#list-nodes li").remove();

  if (nodes.length === 0) {
    $("ul#list-nodes").append("<li>No nodes</li>");
    return;
  }

  nodes.forEach(async function (node, index) {
    const newLisItem = $(buildNodeListItem(node, index));
    const response = await $.get(`/node/ping/${node.address}/${node.port}`);

    if (response && response.lastBlock) {
      $("#span-current-block").text(response.lastBlock);
    }

    $("ul#list-nodes").append(newLisItem);
  });
}

async function rebuildAddressList() {
  $("ul#list-addresses li").remove();

  if (addresses.length === 0) {
    $("ul#list-addresses").append("<li>No addresses</li>");
    return;
  }

  addresses.forEach(async function (address, index) {
    const newLisItem = $(await buildAddressListItem(address, index));
    $("ul#list-addresses").append(newLisItem);
  });
}

function buildNodeListItem(node, index) {
  return `<li id="list-nodes-${index}">
            <strong>Node ${index}</strong>: Active&nbsp;
            <i class="fa fa-stop btn-stop-node mx-1 cursor-pointer"></i>
            <i class="fa fa-remove btn-delete-node mx-1 cursor-pointer"></i>
            <i class="fa fa-retweet btn-ping-node mx-1 cursor-pointer"></i>
            <button class="btn btn-secondary btn-sm btn-start-mining" type="button">Start mining</button>
            <br>
            &nbsp; ${node["address"]}:${node["port"]}
          </li>`;
}

async function buildAddressListItem(address, index) {
  const balance = await getBalance(address);

  return `<li id="list-address-${index}">
                <strong>Address ${index}</strong>: ${balance} Ether&nbsp;
                <i class="fa fa-pencil mx-1 btn-edit-address"></i>
                <i class="fa fa-remove mx-1 btn-delete-address"></i>
                <button class="btn btn-secondary btn-sm btn-transfer" type="button">Transfer</button>
                <br>&nbsp; &nbsp;address: ${address}
            </li>`;
}

function deleteAddressListItem(event) {
  const listItem = $(event.currentTarget).parent("li");
  const idToDelete = listItem.get(0).id.replace("list-address-", "");

  addresses = addresses.filter(function (address, index) {
    return index != idToDelete;
  });

  rebuildAddressList();
}

function deleteNodeListItem(event) {
  const listItem = $(event.currentTarget).parent("li");
  const idToDelete = listItem.get(0).id.replace("list-nodes-", "");

  nodes = nodes.filter(function (node, index) {
    return index != idToDelete;
  });

  rebuildNodeList();
}

function openEditAddressModal() {
  $("#edit-account").modal("show");
}

function openTransferModal() {
  $("#modal-transfer").modal("show");
}

function log(message) {
  const textArea = $("#textarea-console");
  textArea.val(textArea.val() + `\n${message}`);
  textArea.scrollTop(textArea[0].scrollHeight);
}

function closeAlert(event) {
  const target = event.currentTarget;
  $(target).parent(".alert").hide();
}

function pingNode(event) {
  $("#alert-node-respond").hide();
  $("#alert-node-dont-respond").hide();

  const elmNode = $(event.currentTarget).parent("li");
  const nodeIndex = elmNode[0].id.replace("list-nodes-", "");
  const objNode = nodes[nodeIndex];
  const url = SERVER_URL + `/node/ping/${objNode.address}/${objNode.port}`;

  $.get(url, {}, function (res) {
    if (res.alive) {
      $("#alert-node-respond").show();
      $("#span-current-block").text(res.lastBlock).fadeOut(100).fadeIn(100);
    } else {
      $("#alert-node-dont-respond").show();
    }
  });
}

function startMining(event) {
  const elmButton = $(event.currentTarget);
  const elmNode = elmButton.parent("li");

  elmButton
    .removeClass("btn-secondary btn-start-mining")
    .addClass("btn-danger btn-stop-mining")
    .text("Stop mining");
}

function stopMining(event) {
  const elmButton = $(event.currentTarget);
  const elmNode = elmButton.parent("li");

  elmButton
    .removeClass("btn-danger btn-stop-mining")
    .addClass("btn-secondary btn-start-mining")
    .text("Start mining");
}

async function getBalance(address) {
  if (nodes.length === 0) {
    alert("No active nodes were found");
  }

  const url = SERVER_URL + `/address/${address}/balance`;
  let nodeIndex = 0;
  let node = null;
  let nodePort = null;
  let nodeAddress = null;
  let balance = 0;
  let data = {};
  let response;

  while (!balance && nodeIndex <= nodes.length - 1) {
    node = nodes[nodeIndex];
    nodeAddress = node["address"];
    nodePort = node["port"];

    data = {
      nodeAddress,
      nodePort,
    };

    response = await $.get(url, data);
    nodeIndex++;

    if (response && response.balance) {
      balance = response.balance;
    }
  }

  return balance;
}
