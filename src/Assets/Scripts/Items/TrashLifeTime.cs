using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrashLifeTime : MonoBehaviour {

	// Use this for initialization
	void Start () {
        Destroy(gameObject, 15);		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
