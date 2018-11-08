using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PooDownScript : MonoBehaviour {
    public float lifeTime = 60;
	// Use this for initialization
	void Start () {
        Destroy(gameObject, lifeTime);
    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
