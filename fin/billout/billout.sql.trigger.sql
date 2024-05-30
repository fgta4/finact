DROP PROCEDURE IF EXISTS trn_billoutdetil_updateheader;


DELIMITER //

CREATE PROCEDURE trn_billoutdetil_updateheader (
	IN in_billout_id varchar(30)
)
BEGIN
	
	declare p_billout_id varchar(30);
	
	
	declare p_billoutdetil_totalitem int(5);
	declare p_billoutdetil_totalqty int(5);
	declare p_billoutdetil_salesgross decimal(16, 0);
	declare p_billoutdetil_discount decimal(16, 0);
	declare p_billoutdetil_subtotal decimal(16, 0);
	declare p_billoutdetil_pph decimal(16, 0);
	declare p_billoutdetil_nett decimal(16, 0);
	declare p_billoutdetil_ppn decimal(16, 0);
	declare p_billoutdetil_total decimal(16, 0);
	declare p_billoutdetil_totaladdcost decimal(16, 0);
	declare p_billoutdetil_dp decimal(16, 0);
	declare p_billoutdetil_payment decimal(16, 0);
	

	set p_billout_id = in_billout_id;

	
	select 
		COALESCE(sum(billoutdetil_totalitem), 0) as billoutdetil_totalitem,
		COALESCE(sum(billoutdetil_totalqty), 0) as billoutdetil_totalqty,
		COALESCE(sum(billoutdetil_salesgross), 0) as billoutdetil_salesgross,
		COALESCE(sum(billoutdetil_discount), 0) as billoutdetil_discount,
		COALESCE(sum(billoutdetil_subtotal), 0) as billoutdetil_subtotal,
		COALESCE(sum(billoutdetil_pph), 0) as billoutdetil_pph,
		COALESCE(sum(billoutdetil_nett), 0) as billoutdetil_nett,
		COALESCE(sum(billoutdetil_ppn), 0) as billoutdetil_ppn,
		COALESCE(sum(billoutdetil_total), 0) as billoutdetil_total,
		COALESCE(sum(billoutdetil_totaladdcost), 0) as billoutdetil_totaladdcost,
		COALESCE(sum(billoutdetil_dp), 0) as billoutdetil_dp,
		COALESCE(sum(billoutdetil_payment), 0) as billoutdetil_payment
	into
		p_billoutdetil_totalitem,
		p_billoutdetil_totalqty,
		p_billoutdetil_salesgross,
		p_billoutdetil_discount,
		p_billoutdetil_subtotal,
		p_billoutdetil_pph,
		p_billoutdetil_nett,
		p_billoutdetil_ppn,
		p_billoutdetil_total,
		p_billoutdetil_totaladdcost,
		p_billoutdetil_dp,
		p_billoutdetil_payment
	from trn_billoutdetil
	where
	billout_id = p_billout_id;


	update trn_billout
	set
	billout_totalitem = p_billoutdetil_totalitem,
	billout_totalqty = p_billoutdetil_totalqty,
	billout_salesgross = p_billoutdetil_salesgross,
	billout_discount = p_billoutdetil_discount,
	billout_subtotal = p_billoutdetil_subtotal,
	billout_pph = p_billoutdetil_pph,
	billout_nett = p_billoutdetil_nett,
	billout_ppn = p_billoutdetil_ppn,
	billout_total = p_billoutdetil_total,
	billout_totaladdcost = p_billoutdetil_totaladdcost,
	billout_dp = p_billoutdetil_dp,
	billout_payment = p_billoutdetil_payment
	where
	billout_id = p_billout_id;
	

END //

DELIMITER ;






DROP TRIGGER IF EXISTS trn_billoutdetil_after_insert;

DELIMITER $$
$$

CREATE DEFINER=`root`@`localhost` TRIGGER `trn_billoutdetil_after_insert` AFTER INSERT ON `trn_billoutdetil` FOR EACH ROW BEGIN
	call trn_billoutdetil_updateheader(NEW.billout_id);
END

$$
DELIMITER ;



DROP TRIGGER IF EXISTS trn_billoutdetil_after_update;

DELIMITER $$
$$

CREATE DEFINER=`root`@`localhost` TRIGGER `trn_billoutdetil_after_update` AFTER UPDATE ON `trn_billoutdetil` FOR EACH ROW BEGIN
	call trn_billoutdetil_updateheader(NEW.billout_id);
END

$$
DELIMITER ;




DROP TRIGGER IF EXISTS trn_billoutdetil_after_delete;

DELIMITER $$
$$

CREATE DEFINER=`root`@`localhost` TRIGGER `trn_billoutdetil_after_delete` AFTER DELETE ON `trn_billoutdetil` FOR EACH ROW BEGIN
	call trn_billoutdetil_updateheader(NEW.billout_id);
END

$$
DELIMITER ;







