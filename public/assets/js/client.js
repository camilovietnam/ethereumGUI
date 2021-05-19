let nodes = [];
let addresses = [];

$(function () {
  $("#btn-add-address").on("click", addNewAddress);
  $("#btn-add-node").on("click", addNewNode);

  $(document).on("click", ".btn-edit-address", openEditAddressModal);
  $(document).on("click", ".btn-transfer", openTransferModal);

  $(document).on("click", ".btn-delete-address", deleteAddressListItem);
  $(document).on("click", ".btn-delete-node", deleteNodeListItem);
});

function addNewNode() {
  const newNodeAddress = $("#input-node-address").val();
  const newNodePort = $("#input-node-port").val();

  if (newNodeAddress === "" || newNodePort === "") {
    return;
  }

  nodes.push([newNodeAddress, newNodePort]);

  rebuildNodeList();

  $("#input-node-address").val("");
  $("#input-node-port").val("");
}

function addNewAddress() {
  const newAddress = $("#input-address").val();

  if (newAddress === "") {
    return;
  }

  addresses.push(newAddress);

  rebuildAddressList();

  $("#input-address").val("");
}

function rebuildNodeList() {
  $("ul#list-nodes li").remove();

  if (nodes.length === 0) {
    $("ul#list-nodes").append("<li>No nodes</li>");
    return;
  }

  nodes.forEach(function (node, index) {
    const newLisItem = $(buildNodeListItem(node, index));

    $("ul#list-nodes").append(newLisItem);
  });
}

function rebuildAddressList() {
  $("ul#list-addresses li").remove();

  if (addresses.length === 0) {
    $("ul#list-addresses").append("<li>No addresses</li>");
    return;
  }

  addresses.forEach(function (address, index) {
    const newLisItem = $(buildAddressListItem(address, index));

    $("ul#list-addresses").append(newLisItem);
  });
}

function buildNodeListItem(node, index) {
  return `<li id="list-nodes-${index}">
            <strong>Node ${index}</strong>: Active&nbsp;
            <i class="fa fa-stop mx-1 btn-stop-node"></i>
            <i class="fa fa-remove mx-1 btn-delete-node"></i>
            <button class="btn btn-secondary btn-sm btn-start-mining" type="button">Start mining</button>
            <br>
            &nbsp; ${node[0]}:${node[1]}
          </li>`;
}

function buildAddressListItem(address, index) {
  return `<li id="list-address-${index}">
                <strong>Address ${index}</strong>: 0 Ether&nbsp;
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
